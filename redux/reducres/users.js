import {USERS_DATA_STATE_CHANGE} from '../constants/index'
import {USERS_POSTS_STATE_CHANGE,CLEAR_DATA,USERS_LIKES_STATE_CHANGE} from '../constants/index'



const initialState = {
   users:[],
   feed:[],
   usersLoaded :0,

}


export const users = (state =initialState,action)=>{
  
        switch(action.type) { 
          case USERS_DATA_STATE_CHANGE:
              return {
                ...state,
                users:[...state.users,action.user]

              }
            case USERS_POSTS_STATE_CHANGE :
                return {
                    ...state,
                    usersLoaded:state.usersLoaded +1,
                    feed:[...state.feed,...action.posts]
                }
                  console.log(users)
                  case CLEAR_DATA :
                return initialState

                case USERS_LIKES_STATE_CHANGE :
                  return {
                    ...state,
                    feed:state.feed.map(post => post.id==action.postId?
                      {...post,currentUserLike:action.currentUserLike} : post)
                  }

                default:
                    return state

        }
       
        
    
}