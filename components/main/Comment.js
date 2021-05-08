import React,{useState,useEffect} from 'react'
import { StyleSheet, TextInput,Image, View,Button,Text,FlatList } from 'react-native';
import firebase from 'firebase'
require("firebase/firestore")
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {fetchUsersData} from '../../redux/actions/index'





export  function Comment(props) {
       
    const [comments,setComments] = useState([]);
    const [postId,setPostId] =useState("");
    const [text,setText]=useState('');
  console.log(props.route.params.postId )
  console.log(props.route.params.uid)
    useEffect(() => {
        function matcUserToComment(comments){
            for (let i = 0; i<comments.length; i++){
                   if(comments[i].hasOwnProperty('user')){
                       continue ;
                   }
                const user = props.users.find(x=> x.uid===comments[i].creator)
                if (user==undefined){
                    props.fetchUsersData(comments[i].creator,false)
                } else{
                    comments[i].user=user;
                }
            }
            setComments(comments)
        }
        if (props.route.params.postId !== postId){
            firebase.firestore().collection("post").doc(props.route.params.uid)
            .collection("userPosts").doc(props.route.params.postId).collection('comments').get()
            .then((snapshot) =>{
                let comments = snapshot.docs.map(doc =>{
                    const data = doc.data();
                    const id =doc.id

                    return{id,...data}

                })
                matcUserToComment(comments)

            })

            setPostId(props.route.params.postId)

        }else{
            matcUserToComment(comments)

        }
        


    }
    ,[props.route.params.postId,props.users])

 

    const onCommentSend =()=>{
        firebase.firestore().collection("post").doc(props.route.params.uid)
        .collection("userPosts").doc(props.route.params.postId)
        .collection('comments').add({
            creator:firebase.auth().currentUser.uid, 
            text

        })
    
    }
    console.log(comments)
    console.log(postId)

    return (
        <View>
            <FlatList
            numColumns={1}
            horizontal={false}
            data={comments}
            renderItem={({item})=>(
                <View>
                    {item.user !== undefined?
                    <Text>{item.user.name}</Text>
                    :null}
                    <Text>{item.text}</Text>

                </View>
            )}
            
            />
            <View>
              <TextInput
              placeholder="insert your comments"
              onChangeText={(text)=>setText(text)}
              /> 
              <Button
              onPress={()=>onCommentSend()}
              title="SEND"/> 
            </View>
        </View>
    )
}


const mapStateToProps =(store) =>({
  
    users:store.usersState.users
     
 })
 const mapDispatchProps =(dispatch)=>bindActionCreators({fetchUsersData},dispatch)
 export default connect(mapStateToProps,mapDispatchProps)(Comment)