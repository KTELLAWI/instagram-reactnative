import React,{useState,useEffect} from 'react'
import {StyleSheet ,View,Text, TabBarIOSItem,FlatList,Image} from 'react-native'
import { set } from 'react-native-reanimated'
import {connect} from 'react-redux'
import firebase from 'firebase' 
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { Button, Input,} from 'react-native-elements';


require("firebase/firestore")


function Profile(props) {
    const [userPosts,setUserPosts]= useState([])
    const [user,setUser]= useState()
    const [follow,setFollow] = useState(false)
    const {posts,currentUser} = props;

  //  const {posts,currentUser} = props;
   console.log(props)
    useEffect( ()=>{
        if (props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)           
             setUserPosts(posts)
            console.log(props.route.params.uid)
        }
        else {

            
                    firebase.firestore()
                    .collection("users")
                    .doc(props.route.params.uid)
                    .get().then((snapshot)=>{
                                           
                          if (snapshot.exists){
                           setUser(snapshot.data())
                            console.log(user)
                        }
                        else {
                            console.log("does not exist")
                        }
                    })
            
            
            
            
               
                    firebase.firestore().collection("post").doc(props.route.params.uid).collection("userPosts")
                    .orderBy("creation","asc").get()
                    .then((snapshot)=>{
                         const posts= snapshot.docs.map(doc=>{
                             const data = doc.data();
                             const id = doc.id;
                             console.log(data);
            
                             return {id,...data}
                         })
                         setUserPosts(posts)
                         console.log(posts);
            
                })   
            
             



        }


       
        
 if (props.following.indexOf(props.route.params.uid) > -1) {
    setFollow(true);

}  
else{
    setFollow(false);
}


   
    

    },[props.route.params.uid, props.following])

   console.log(props.route.params.uid)
    console.log(firebase.auth().currentUser.uid)
    
    console.log("user is",user)
   // console.log(currentUser)

  // if (user===null ||  "undefined"){
      ///    return <View></View>
     // }
      const onFollow =()=>{
          firebase.firestore().collection("following").doc(firebase.auth().currentUser.uid)
          .collection("userFollowing").doc(props.route.params.uid).set({})
      }
      const onUnfollow =()=>{
        firebase.firestore().collection("following").doc(firebase.auth().currentUser.uid)
        .collection("userFollowing").doc(props.route.params.uid).delete()
    }
    const signOut = ()=> {
        firebase.auth().signOut()
    }
    return (
        <View style={styles.container}>
            
            
            {user && 
             <Text>{user.name}</Text>
            }
            {props.route.params.uid!== firebase.auth().currentUser.uid?(
                   <View
                   style={styles.follow}>
                       {follow ? ( 
                           <Button
                           type="outline"
                            style={styles.logout}
                           title="FOLLOWING"
                           onPress={()=>onUnfollow()}/>

                          
                       ) : <Button
                       type="outline"
                        style={styles.logout}
                       title="FOLLOW"
                       onPress={()=>onFollow()}/>

                       }
                   </View>

              ) : <Button
               type="outline"
              style={styles.logout}
                    onPress={()=>signOut()}
                    title='Logout'
                     />}

             <View style={styles.containerGallery}>
                 <FlatList
                 
                 numColumns={3}
                 horizontal={false}
                 data={userPosts}
                 renderItem={({item})=>( 
                     <View  style={styles.containerImage}>
                        
                        <Image 
                        style={styles.image}
                        source={{uri:item.downloadURL}} />
                     </View>

                 )}
                 />

                

             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
     flex: 1,
     marginTop:0,
     backgroundColor:"white",
    },
    containerInfo:{
        flex:1,
        

    },
    containerGallery :{
        flex: 1,
      

   
    },
    image:{
        flex:1,
        aspectRatio:1/1,
        width:300,
        height:300,

    },
    containerImage:{
        flex:1/3,
        width:"100%",
        marginTop:30,


    },
    logout:{
        width:150,
        marginTop:30,
       


    },
    follow:{
        flexDirection:"row",
        flex:0.1,
        width:"50%",
        

        backgroundColor:"yellow",

    }

    
})



const mapStateToProps =(store) =>({
    currentUser:store.userState.currentUser,
    posts:store.userState.posts,
    following:store.userState.following,
     
 })
 //const mapDispatchProps =(dispatch)=>bindActionCreators({fetchUser,fetchUserPosts},dispatch)
 export default connect(mapStateToProps,null)(Profile)
 
 