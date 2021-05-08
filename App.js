import { StatusBar } from 'expo-status-bar';
import React ,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import LandingScreen from './components/auth/Landing';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack'
import Register from './components/auth/Register';
import 'react-native-gesture-handler';
import firebase from 'firebase' 
import {auth,db} from './firebase'
import Login from './components/auth/Login'
import{Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './redux/reducres'
import thunk from 'redux-thunk'
import Main from './components/Main'
import Add from './components/main/Add'
import Save from './components/main/Save'
import Comment from './components/main/Comment'





const store = createStore(rootReducer,applyMiddleware(thunk))





export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadded:false,
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loadded:true,
          loggedIn:false
        })
      }
      else{
        this.setState({
          loadded:false,
          loggedIn:true
        })
      }
    })
  }
 
  render() {
    const Stack = createStackNavigator();

    const {loadded,loggedIn} = this.state;

    {/*  if(!loadded){ 
        return(
          <View>
            <Text>dddddddddddddd</Text>
          </View>
        )
      }*/}
      if (!loggedIn){ 

        return(
      <NavigationContainer>
      <Stack.Navigator initialRoutName= "Landing">
        <Stack.Screen name= "Landing" component={LandingScreen} />
        <Stack.Screen name= "Register" component={Register} options={{headerShown:true}}/>
        <Stack.Screen name= "Login" component={Login} options={{headerShown:true}}/>
        </Stack.Navigator> 
      </NavigationContainer>
        )
      }

      return(
              
      <Provider store={store}>
       <NavigationContainer>
      <Stack.Navigator initialRoutName= "Main">
        <Stack.Screen name= "Main" component={Main} options={{headerShown:true}}/>
        <Stack.Screen name= "Add" component={Add} navigation={this.props.navigation} />
        <Stack.Screen name= "Save" component={Save} navigation={this.props.navigation} />
        <Stack.Screen name= "Comment" component={Comment} navigation={this.props.navigation} />

        </Stack.Navigator> 
    </NavigationContainer>
      </Provider>
      )
      
    
  }
}



