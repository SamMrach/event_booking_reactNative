import React,{useState,useEffect,useCallback} from 'react';
import {Text,View,StyleSheet, TextInput, Button, TouchableOpacityBase, TouchableOpacity,ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from "react-native-animated-loader";
import * as SplashScreen from 'expo-splash-screen';
export default function LoginScreen() {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigation = useNavigation();
    const [animatedVisible,setVisible]=useState(false);
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
          try {
            // Keep the splash screen visible while we fetch resources
            await SplashScreen.preventAutoHideAsync();
            // Pre-load fonts, make any API calls you need to do here
            
            // Artificially delay for two seconds to simulate a slow loading
            // experience. Please remove this if you copy and paste the code!
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.warn(e);
          } finally {
            // Tell the application to render
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);
      const onLayoutRootView = useCallback(async () => {
        console.log("rootview");
        if (appIsReady) {
          // This tells the splash screen to hide immediately! If we call this after
          // `setAppIsReady`, then we may see a blank screen while the app is
          // loading its initial state and rendering its first pixels. So instead,
          // we hide the splash screen once we know the root view has already
          // performed layout.
          console.log("now");
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
      if (!appIsReady) {
        return null;
      }
    
    const handleSignUp = ()=>{
       /* fetch('http://10.0.2.2:8000/api/users/login',{
            method:"post",
            body:JSON.stringify({email,password})
        })*/
        //alert({email:email,password:password});
        setVisible(true);
     axios.post('https://printzillas.art/api/users/login',{email:email,password:password})
       .then(async (response)=>{
           setVisible(false);
           console.log(response.data.user.photo !== null);
           await AsyncStorage.setItem('@username',response.data.user.name);
           await AsyncStorage.setItem('@Id',JSON.stringify(response.data.user.id));
           if(response.data.user.photo != null){
               await AsyncStorage.setItem('@imageSetup','true');
               await AsyncStorage.setItem('@Image',JSON.stringify(response.data.user.photo));
           }else{
            await AsyncStorage.setItem('@imageSetup','false');
           }
           
           //let fullName=await AsyncStorage.getItem('@username');
           // console.log(tempofd);
           //response.data.user.photo !== null ? navigation.replace('Home') : navigation.replace('Profile');
           navigation.replace('Home');
       })
       .catch((error)=>{
           console.log(error);
           alert('email or password invalid');
       })
        
    }
    return(
        <View onLayout={onLayoutRootView} style={styles.container}>
        
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
        <AnimatedLoader
        visible={animatedVisible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}>
        <Text>One Momoent Please...</Text>
        </AnimatedLoader>
          
        </View>
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
    },
    lottie: {
        width: 100,
        height: 100,
      },
})

