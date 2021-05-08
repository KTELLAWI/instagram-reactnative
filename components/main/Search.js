import React,{useState} from 'react'
import { StyleSheet, TextInput,Image, View,FlatList,TouchableOpacity } from 'react-native';
import firebase from 'firebase'
require("firebase/firestore")
import Profile from './Profile'
import { Button, Input,} from 'react-native-elements';

export default function Search(props) {
    const [users,setUsers] =useState()
const fetchUsers = (search)=>{

    firebase.firestore().collection("users").where("name",">=", search).get().then((snapshot)=>{
        const users= snapshot.docs.map(doc=>{
            const data = doc.data();
            const id = doc.id;
            console.log(data);

            return {id,...data} 

    })
              setUsers(users)
})

}

console.log(users)
    return (
        <View>
            <TextInput
            onChangeText={(search)=>fetchUsers(search)}
            placeholder="type here"
            />
            <FlatList
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem ={({item})=>(
               
                    <View>
               <Button 
                type="outline"
               onPress={()=>props.navigation.navigate('Profile',{uid:item.id})}
               title={item.name}>
               
               </Button>
                
             
                    

               </View>
               
            )
        }

            />

        </View>
    )
}
