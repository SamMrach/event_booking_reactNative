import React,{useState} from 'react';
import {Text,View,StyleSheet, TextInput, Button, TouchableOpacityBase, TouchableOpacity,ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from "react-native-animated-loader";
export default function RegisterScreen() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const navigation = useNavigation();
    const [animatedVisible,setVisible]=useState(false);
    const handleSignUp=()=>{
        //alert(email);
        setVisible(true);
        axios.post('https://printzillas.art/api/users',{name:name,email:email,password:password,telephone:phone})
        .then(async (res)=>{
            setVisible(false);
            //console.log(res.data);
            await AsyncStorage.setItem('@username',res.data.name);
            await AsyncStorage.setItem('@Id',JSON.stringify(res.data.id));
            
            //alert(res);
            navigation.replace('Profile');
        })
        .catch((err)=>{
            alert(err);
        })
    }
    return(
        <ImageBackground style={styles.container} resizeMode="cover" source={require('../assets/background_dot.png')}>
        <AnimatedLoader
        visible={animatedVisible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}>
        <Text>One Momoent Please...</Text>
        </AnimatedLoader>
        <Text style={styles.header}>Create Account</Text> 
        <TextInput style={styles.input} placeholder="Name" 
        label="name"
        value={name}
        onChangeText={(text)=>{setName(text)}}
        />
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
        <TextInput style={styles.input} placeholder="Phone Number"
        label="telephone"
        value={phone}
        onChangeText={(text)=>{setPhone(text)}}
        />
        <TouchableOpacity onPress={()=>handleSignUp()} style={styles.submit} >
            <Text style={styles.text} >Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.row}>
            <Text>Already have an account ?</Text>
            <TouchableOpacity onPress={()=>navigation.replace('LoginScreen')}>
                <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground> 
    )
}

const styles=StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
      },
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
