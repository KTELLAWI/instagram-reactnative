import {USER_STATE_CHANGE} from '../constants/index'
import {USER_POST_STATE_CHANGE} from '../constants/index'
import {USER_FOLLOWING_STATE_CHANGE,CLEAR_DATA} from '../constants/index'



const initialState = {
    currentUser:{},
    posts:[],   
    following:[]
}


export const user = (state =initialState,action)=>{
  
        switch(action.type) { 
          case USER_STATE_CHANGE:
              return {
                ...state,
                currentUser:action.currentUser

              }
            case USER_POST_STATE_CHANGE :
                return {
                    ...state,
                    posts:action.posts
                }
                case USER_FOLLOWING_STATE_CHANGE:
                    return {
                        ...state,
                        following:action.following
                    }
                
                case CLEAR_DATA:
                    return {
                        currentUser:{},
                        posts:[],   
                        following:[]
                    }  
                    
                
               
                default:
                    return state

        }
       
        
    
}