import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet, TextInput, Button, TouchableOpacityBase, TouchableOpacity,ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen() {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigation = useNavigation();
    const handleSignUp = ()=>{
       /* fetch('http://10.0.2.2:8000/api/users/login',{
            method:"post",
            body:JSON.stringify({email,password})
        })*/
        //alert({email:email,password:password});
     axios.post('https://printzillas.art/api/users/login',{email:email,password:password})
       .then(async (response)=>{
           console.log(response.data.user.photo !== null);
           await AsyncStorage.setItem('@username',response.data.user.name);
           await AsyncStorage.setItem('@Id',JSON.stringify(response.data.user.id));
           if(response.data.user.photo !== null){
               await AsyncStorage.setItem('@imageSetup','true');
               await AsyncStorage.setItem('@Image',JSON.stringify(response.data.user.photo));
           }else{
            await AsyncStorage.setItem('@imageSetup','false');
           }
           
           //let fullName=await AsyncStorage.getItem('@username');
           // console.log(tempofd);
           response.data.user.photo !== null ? navigation.replace('Home') : navigation.replace('Profile');
          
       })
       .catch((error)=>{
           console.log(error);
           alert('email or password invalid');
       })
        
    }
    return(
        <ImageBackground style={styles.container} resizeMode="cover" source={require('../assets/background_dot.png')}>
      
        <Text style={styles.header}>Log in</Text> 
        <TextInput style={styles.input} placeholder="Email"
        label="email"
        value={email}
        onChangeText={(text)=>{setEmail(text)}}
        />
        <TextInput style={styles.input} placeholder="Password"
        label="password"
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        />
        <TouchableOpacity onPress={()=>{handleSignUp()}} style={styles.submit} >
            <Text style={styles.text} >Sign In</Text>
        </TouchableOpacity>
        <View style={styles.row}>
            <Text>don't have an account ? </Text>
            <TouchableOpacity onPress={()=>navigation.replace('RegisterScreen')}>
                <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground> 
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    header:{
        fontSize:24,
        fontWeight: 'bold',
        color: '#191919',
        marginBottom:15,
    },
    submit:{
        width:250,
        height:50,
        borderRadius:5,
        marginBottom:15,
        paddingVertical:14,
        backgroundColor: "#f78f1e",
    },
    text:{
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
      },
    link: {
        fontWeight: 'bold',
        color: '#f78f1e',
    },
    input:{
     width:250,
     height:50,
     borderWidth:1,
     borderColor: '#f78f1e',
     marginBottom:15,
     borderRadius:6,
     padding:12,
     backgroundColor:'#f9f9f9',
    }
})

