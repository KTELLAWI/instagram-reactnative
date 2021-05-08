import firebase from 'firebase';
import {USER_STATE_CHANGE} from '../constants/index'
import {USER_POST_STATE_CHANGE} from '../constants/index'
import {USER_FOLLOWING_STATE_CHANGE} from '../constants/index'
import {USERS_DATA_STATE_CHANGE} from '../constants/index'
import {USERS_POSTS_STATE_CHANGE,CLEAR_DATA} from '../constants/index'
import {USERS_LIKES_STATE_CHANGE} from '../constants/index'


 export function clearData(){
     return ((dispatch)=>{
          dispatch ({
              type:CLEAR_DATA
          })
     })
 }
 function fetchUser(){
    return((dispatch)=>{
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot)=>{
                               
              if (snapshot.exists){
                dispatch({
                    type:USER_STATE_CHANGE,
                    currentUser:snapshot.data()
                })
                console.log(snapshot.data())
            }
            else {
                console.log("does not exist")
            }
        })
    })
}

export default fetchUser

 export function fetchUserPosts(){
    return((dispatch)=>{
        firebase.firestore().collection("post").doc(firebase.auth().currentUser.uid).collection("userPosts")
        .orderBy("creation","asc").get()
        .then((snapshot)=>{
             const posts= snapshot.docs.map(doc=>{
                 const data = doc.data();
                 const id = doc.id;
                 console.log(data);

                 return {id,...data}
             })
             dispatch ({
                 type:USER_POST_STATE_CHANGE,
                 posts,
             }) 
             console.log(posts);

    })   
})
 }

 export function fetchUserFollowing(){
    return((dispatch)=>{
        firebase.firestore().collection("following").doc(firebase.auth().currentUser.uid).collection("userFollowing")
             .onSnapshot((snapshot)=>{
             const following= snapshot.docs.map(doc=>{
                 
                 const id = doc.id;

                 return id
             })
             dispatch ({
                 type:USER_FOLLOWING_STATE_CHANGE,
                 following,
             }) 
             console.log(following);

                    for (let i = 0; i < following.length; i++)
                    dispatch (fetchUsersData(following[i]))
    })   
})
 }
 

 export function fetchUsersData(uid,getPosts) {
     return ((dispatch,getState)=>{
         const found = getState().usersState.users.some((el)=>el.uid ===uid)

         if (!found){
            firebase.firestore().collection("users").doc(uid).get().then((snapshot)=>{
                               
                if (snapshot.exists){
                    let user =snapshot.data()
                    user.uid=snapshot.id
                  dispatch({
                      type:USERS_DATA_STATE_CHANGE,
                      user,
                  })
                  dispatch (fetchUsersFollowingPosts(user.uid));
              }
              
          })

              if(getPosts){
                dispatch (fetchUsersFollowingPosts(uid));

              }
         }

     })
 }

 export function fetchUsersFollowingPosts(uid){
    return((dispatch,getState) =>{
        firebase.firestore().collection("post").doc(uid).collection("userPosts")
        .orderBy("creation","asc").get()
        .then((snapshot)=>{
           // const uid = snapshot.query.EP.path.segments[1];
            
            console.log({snapshot,uid})

            const user = getState().usersState.users.find((el)=>el.uid ===uid)

             const posts= snapshot.docs.map(doc=>{
                 const data = doc.data();
                 const id = doc.id;
                 console.log(data);

                 return {id,...data,user}
             })
             console.log("posta are",posts)
             for (let i= 0;i<posts.length;i++){
                 dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
             }
             dispatch ({
                 type:USERS_POSTS_STATE_CHANGE,
                 posts,
                 uid
             }) 
             console.log(getState());

    })   
})
 }

 export function fetchUsersFollowingLikes(uid,postId){
    return((dispatch,getState) =>{
        firebase.firestore().collection("post").doc(uid).collection("userPosts").doc(postId).collection('likes')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot)=>{
           // const postId = snapshot.ZE.path.segments[3];
           let currentUserLike =false;
           if(snapshot.exists){
               currentUserLike =true;
           }
            
          
             dispatch ({
                 type:USERS_LIKES_STATE_CHANGE,
                 postId,
                 currentUserLike
             }) 
             console.log(getState());

    })   
})
 }