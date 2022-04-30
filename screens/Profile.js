import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React,{useState,useEffect} from "react";
import {Button,Modal,StatusBar,Dimensions,Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,Image, Alert} from 'react-native'
import MyInput from '../Components/MyInput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import launchImageLibrary from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
export default function Profile(){
    const navigation =useNavigation();
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');
    const [image,setImage]=useState(' ');
    const handleSelectImage=async()=>{
    
     let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,			
        allowsEditing: true,
    });

    console.log(result);

    if (!result.cancelled) {
       setImage(result.uri);
    }
     /*try{
         
         
        ImagePicker.showImagePicker(options,(res)=>{
            if(res.errorCode=='permission'){
                alert('pereact-native link react-native-image-pickerrmission not satisfied');
            }else if(res.errorVode=='others'){
                alert(res.errorMessage)
            }else if(res.assets[0].fileSize > 2097152){
                alert('Maximus image size exceeded','Choose image under 2MB')
            }else {
                setImage(res.assets[0].base64)
            }
        }) 
        
     }catch(err){
         console.log(err)
     }*/
        
     
     
    
    }
    useEffect(async()=>{
        var id=await AsyncStorage.getItem('@Id');
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                alert('Sorry, Camera roll permissions are required to make this work!');
                }
            }
            })();
      axios.get('http://10.0.2.2:8000/api/users/'+id)
      .then((res)=>{
          console.log(res.data);
          setEmail(res.data.email);
          setName(res.data.name);
          setPhone(res.data.telephone);
          setAddress(res.data.adress);
          setImage(res.data.photo);
      })
    },[])
    const handleSubmit=async()=>{
        var id=await AsyncStorage.getItem('@Id');
        //console.log(image);
        axios.put('http://10.0.2.2:8000/api/users/'+id,{email:email,name:name,telephone:phone,adress:address,photo:image})
        .then((res)=>{
            console.log(res.data.adress)
            alert('vous venez de changer vos informations')
        })
        .catch((err)=>{
            alert(err);
        })
    }
    return(
      <View style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity style={styles.leftArrow} onPress={()=>{navigation.replace('Home')}} >
                 <Image style={styles.leftIcon} source={require('../assets/leftBlack.png')} /> 
              </TouchableOpacity>
              <Text style={styles.text}>Profil</Text>
          </View>
          <View style={styles.body} >
              <TouchableOpacity style={styles.profil} onPress={()=>{handleSelectImage()}}>
                  <Image source={{uri:image}} style={styles.profilImage}/>
              </TouchableOpacity>
            <MyInput varType="Email Address" varValue={email} onChangeFunction={(variable)=>{setEmail(variable)}} />
            <MyInput varType="Full Name" varValue={name} onChangeFunction={(variable)=>{setName(variable)}} />  
            <MyInput varType="Phone" varValue={phone} onChangeFunction={(variable)=>{setPhone(variable)}} /> 
            <MyInput varType="Address" varValue={address} onChangeFunction={(variable)=>{setAddress(variable)}} /> 
            <TouchableOpacity style={styles.btn} onPress={()=>{handleSubmit()}} >
                <Text style={styles.btnText}>Enregister </Text>
            </TouchableOpacity>
          </View>
      </View>
    )
}
const styles=StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('screen').height,
        backgroundColor:'white',
        paddingTop:22,
    },
    header:{
        height:55,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingHorizontal:20,
        borderBottomColor:'#f78f1e',
        borderBottomWidth:0.2,
        

    },
    leftArrow:{
        width:30,
        height:20,
        marginRight:120,
    },
    leftIcon:{
        width:30,
        height:20,
    },
    text:{
        fontSize:24,
        color:'black',
    },
    body:{
        width:Dimensions.get('window').width,
        alignItems:"center",
        paddingVertical:18,
    },
    profil:{
        width:130,
        height:130,
        
        marginBottom:33,
    },
    profilImage:{
        width:130,
        height:130,
        borderRadius:1000,
        borderWidth:3,
        borderColor:"#f78f1e",
    },
    btn:{
        width:260,
        height:50,
        backgroundColor:'#f78f1e',
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
    },
    btnText:{
        fontSize:20,
        color:'white',
        textAlign:"center",
    }
})