import React, { Component } from 'react'
import {View,Text, TabBarIOSItem} from 'react-native'
import {connect} from 'react-redux'
import {  bindActionCreators } from 'redux';
import fetchUser from '../redux/actions/index'
import {fetchUserPosts} from '../redux/actions/index'
import {fetchUserFollowing,clearData} from '../redux/actions/index'

import firebase from 'firebase' 
import { StyleSheet,TextInput } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../components/main/Feed'
import Profile from '../components/main/Profile'
import Search from '../components/main/Search'
import { Button,} from 'react-native-elements';


import Add from '../components/main/Add'

import MateriaCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



import {auth,db} from '../firebase'
//import { yellow200 } from 'react-native-paper/lib/typescript/styles/colors';
//import { color } from 'react-native-reanimated';
const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = ()=>{ 
    return (null)
}
   export class Main extends Component {
    componentDidMount(){
    this.props.clearData();
      this.props.fetchUser();
      this.props.fetchUserPosts();
      this.props.fetchUserFollowing();
    }

    
    render() {
        const signout = ()=> {
            auth.signOut()
        }
        console.log(this.props)
    return(
        
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen name="Feed" component={Feed}
        options ={{
            tabBarIcon:({color,size})=>(
                <MateriaCommmunityIcons name="home" color= {color} size={26}/>
            )
        }
    }
        />
        <Tab.Screen name="AddContainer" component={EmptyScreen}
        listeners={({navigation})=>({
            tabPress:event=>{
                event.preventDefault();
                navigation.navigate("Add")
            }
        })}
        options ={{
            tabBarIcon:({color,size})=>(
                <MateriaCommmunityIcons name="plus-box" color= {color} size={26}/>
            )
        }
    }
        />
        <Tab.Screen name="Profile" component={Profile} navigation={this.props.navigation}
        listeners={({navigation})=>({
            tabPress:event=>{
                event.preventDefault();
                navigation.navigate("Profile",{uid:firebase.auth().currentUser.uid})
            }
        })}
        options ={{
            tabBarIcon:({color,size})=>(
                <MateriaCommmunityIcons name="account-circle" color= {color} size={26}/>
            )
        }
    }
        />
        <Tab.Screen name="Search" component={Search} navigation={this.props.navigation}
        options ={{
            tabBarIcon:({color,size})=>(
                <MateriaCommmunityIcons name="magnify" color= {color} size={26}/>
            )
        }
    }
        />
        
      </Tab.Navigator>
    )
                 
    }
}


const mapStateToProps =(store) =>({
   currentUser:store.userState.currentUser
    
})
const mapDispatchProps =(dispatch)=>bindActionCreators({fetchUser,fetchUserPosts,fetchUserFollowing,clearData},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Main)
