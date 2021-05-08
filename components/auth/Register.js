import React, { Component } from 'react'
import { StyleSheet, Text,TextInput, View} from 'react-native';
    import firebase from 'firebase' 
    import {auth,db} from '../../firebase'
    import { Button, Input,Image} from 'react-native-elements';




export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            name:"",

        };

        this.onSignUp=this.onSignUp.bind(this)
    }
    //componentDidMount
    onSignUp(){
        const {email, password,name} = this.state;
        auth.createUserWithEmailAndPassword(email, password).then((results)=>{ 
        console.log(results);
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
            name,
            email
        })
    }
        )
       .catch((err)=> console.log(err))
       
       
       
    } 
 
    render() {
        return (
            <View style={styles.container}>
            <Image
            source={{ 
                uri:"data:image/png;base64,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",
            }}
            style={{width:230,height:130}}
            />   
                <TextInput style ={styles.inputContainer}
                placeholder="NAME"
                onChangeText={(name)=>this.setState({name})}
                />
                <TextInput  style ={styles.inputContainer}
                placeholder="email"
                onChangeText={(email)=>this.setState({email})}
                />
                <TextInput style ={styles.inputContainer}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password)=>this.setState({password})}
                />
                <Button
                            type="outline"
                style={styles.button}
                onPress={()=>this.onSignUp()}
                title="SignUp"
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor:"white",
    },
    inputContainer:{
        width:300,
        padding:10,
    },
    button:{
        width:150,
        marginTop:30,
        
      
    },
})