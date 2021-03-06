import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Save  from './Save'
import { Button, Input,} from 'react-native-elements';



export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera,setCamera]=useState(null)
  const[image,setImage]= useState(null);

  const takePicture = async ()=>{
if (camera) {
  const data= await camera.takePictureAsync(null);
  console.log(data.uri)
  setImage(data.uri)
}
  }
  useEffect(() => {
    (async () => {
        {/*const cameraStatus= await Camera.requestPermissionsAsync();
        if(cameraStatus !== "granted")  {
          alert('Sorry, we need camera roll permissions to make this work!');
        }*/}
        const galleryStaus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStaus !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    )();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
            <Camera style={styles.fixedRatio} 
            type={type}
            ratio={"1:1"}
            ref={ref=>setCamera(ref)}/>
            </View>
          <Button
                      type="outline"

          title="Flip Image"
           onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
          </Button>
          <Button
                      type="outline"

          title="Take Picture"
          onPress={()=>takePicture()}/>
          <Button             type="outline"
title="Pick an image from camera roll" onPress={pickImage} />
          <Button
                      type="outline"

 title="Save Image" onPress={()=>navigation.navigate('Save',{image})} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
        </View>
      
    
  );
}

const styles = StyleSheet.create({
  cameraContainer:{
    flex:1,
    flexDirection:"row"

  },
  fixedRatio:{
    flex:1,
    aspectRatio:1,
  } 
})