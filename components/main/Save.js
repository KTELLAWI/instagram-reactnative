import React,{useState} from 'react'
import { StyleSheet, TextInput,Image, View, } from 'react-native';
import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")
import { Button, Input,} from 'react-native-elements';



export default function Save(props,{navigation}) {
    console.log(props)
    const[caption,setCaption] = useState("")
    const pathChild =(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
    const uploadImage= async()=>{
          const uri = props.route.params.image
        const response = await fetch(uri)
        const blob =  await response.blob()
        const task = firebase.storage().ref().child(pathChild).put(blob);
          
        const taskProgress = snapshot =>{
            console.log(`transfereed : ${snapshot.bytesTransferred}`)
        }

        const taskComplete = () =>{
            task.snapshot.ref.getDownloadURL().then((download)=>{
                console.log(download)
                savePost(download)
            })
        }
        const taskError = snapshot =>{
            console.log(snapshot)
        }

        task.on("state-changed",taskProgress,taskError,taskComplete)
        
        const savePost =(downloadURL)=>{
            firebase.firestore().collection("post").doc(firebase.auth().currentUser.uid).collection("userPosts").add({
                downloadURL,
                caption,
                likeCount:0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function(){
               props.navigation.popToTop();
            }))
        }

    }
        
    return (
        <View style ={{flex:1}}>
          <Image
          source={{uri:props.route.params.image}}
          />  
          <TextInput
          placeholder="write a caption of "
          onChangeText={(caption)=> setCaption(caption)}
          />
          <Button
                      type="outline"

          title="Save "
          onPress={()=>uploadImage()}
          />
        </View>
    )
}
