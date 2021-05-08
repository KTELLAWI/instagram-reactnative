import React,{useState,useEffect} from 'react'
import {StyleSheet ,View,Text, TabBarIOSItem,FlatList,Image,Button} from 'react-native'
import { set } from 'react-native-reanimated'
import {connect} from 'react-redux'
import firebase from 'firebase' 
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { Avatar } from 'react-native-elements'
import {AntDesign,FontAwesome,Ionicons} from "@expo/vector-icons"
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'




require("firebase/firestore")


function Feed(props) {
    const [posts,setPosts]= useState([])
     const[feedo,setFeedo] = useState()

 
    useEffect( ()=>{
      // let posts =[];
       if (props.usersLoaded == props.following.length && props.following.length!==0){
        //   for ( let i=0; i < props.following.length;i++){ 
        //   const user = props.users.find((el)=>el.uid ===props.following[i])
         //  if(user != undefined){
          ///     posts = [...posts,...user.posts]
        ///   }
      //  }
        
       // props.feed.sort(function(x,y){
         //  return x.creation-y.creation;
        //  })

          setFeedo(props.feed)

       }
   
    

    },[props.usersLoaded,props.feed])
    console.log(props.usersLoaded)
    console.log(feedo)
    console.log(props.feed)
    console.log(props.users)



    console.log(props.following.length)

   const onLikePress =(userId,postId)=>{
    firebase.firestore().collection("post").doc(userId).collection("userPosts").doc(postId).collection('likes')
    .doc(firebase.auth().currentUser.uid).set({})
   }
   const onDisLikePress =(userId,postId)=>{
    firebase.firestore().collection("post").doc(userId).collection("userPosts").doc(postId).collection('likes')
    .doc(firebase.auth().currentUser.uid).delete({})
   }

  return (
        <View style={styles.container}>
          <View style={styles.containerGallery}>
                 <FlatList
                 
                 numColumns={1}
                 horizontal={false}
                 data={feedo}
                 renderItem={({item})=>( 
                     <View  style={styles.containerImage}>
                      <Text
                        style={styles.container}
                        >{item?.user?.name}</Text>
                       
                        <Image 
                        style={styles.image}
                        source={{uri:item?.downloadURL}} />
                        <Text></Text>
                        {item.currentUserLike ? (

                            <TouchableOpacity>
                            <Ionicons name="heart" size={24} color="red" secondaryColor="blue" secondaryOpacity={ 0.9 } onPress={()=>onDisLikePress(item.user.uid,item.id)}/>
                            

                            </TouchableOpacity>

                           
                        ):
                        <TouchableOpacity>
                        <Ionicons name="heart" size={24} color="red" secondaryColor="blue" secondaryOpacity={ 0.9} onPress={()=>onLikePress(item.user.uid,item.id)} />
                       
                    </TouchableOpacity>

                        
                        
                       
                            
                            
                            }
                        <Text
                        onPress={()=>props.navigation.navigate('Comment',{postId:item.id,uid:item.user.uid})}
                        >View Comment....</Text>
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
     marginTop:40
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
        width:400,
        height:400,

    },
    containerImage:{
        flex:1,

    },

    LikeButton:{
        width:20,
        height:20,
        backgroundColor:"#3223",
        backgroundColor:"#EcEcEc",

    },    
})



const mapStateToProps =(store) =>({
    currentUser:store.userState.currentUser,
    posts:store.userState.posts,
    following:store.userState.following,
    usersLoaded:store.usersState.usersLoaded,
    users:store.usersState.users,
    feed:store.usersState.feed,
     
 })
 //const mapDispatchProps =(dispatch)=>bindActionCreators({fetchUser,fetchUserPosts},dispatch)
 export default connect(mapStateToProps,null)(Feed)
 
 