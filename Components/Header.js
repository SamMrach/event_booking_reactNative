
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React,{useRef,useState,useEffect} from "react";
import {Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Header({myDrawer,name,onSearch}){
    const [keyword,setKeyword]=useState('');
    const [profil,setProfil]=useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const searchAndEmptyKeyword=()=>{
        onSearch(keyword);
        setKeyword('');
    }
    useEffect(async()=>{
        try{
        const profilImage=await AsyncStorage.getItem('@Image');
        JSON.parse(profilImage);
        var length=profilImage.length;
        var v1=profilImage.slice(1);
        var v2=v1.slice(0,length-2);
        //console.log(v2);
        //console.log(profilImage.slice(0,length-1));
        
        profilImage == null ? console.log('est null'):setProfil(v2);
        }catch(err){
            console.log(err)
        }
 
    },[])
    return (
     <View style={styles.header}>
       <View style={styles.welcome}>
         <Text style={styles.welcomeText}> Bonjour, {name}</Text>
         <TouchableOpacity onPress={()=>{myDrawer.current.openDrawer()}}>
         <Image style={styles.profilImage} source={{uri:profil}} />
         </TouchableOpacity>
         
       </View>
       <View style={styles.search}>
        <TextInput style={styles.searchInput} value={keyword} placeholder="chercher un événement,artiste " onChangeText={(text)=>setKeyword(text)}/>
        <TouchableOpacity style={styles.searchIcon} onPress={()=>{searchAndEmptyKeyword()}}>
            <Image style={styles.searchImage} source={require('../assets/searchOrange.png')}></Image>
        </TouchableOpacity>
       </View>
     </View>
    )
}
const styles=StyleSheet.create({
    header:{
        height:180,
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor:'#f78f1e',
        paddingHorizontal:20,
        paddingVertical:20,

    },
    welcome:{
        flex:3,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
    },
    welcomeText:{
        flex:3,
        fontSize:22,
        color:'#fff',
    },
    profilImage:{
        borderWidth:1,
        borderRadius:100,
        width:40,
        height:40,
        borderColor:'#fff',
        
    },
    search:{
        alignSelf: 'stretch',
        position:"relative",
        shadowColor: 'black',
        shadowOffset: {
        width: 5,
        height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        height:50,
    },
    searchInput :{
        borderColor: '#f78f1e',
        borderRadius:10,
        borderWidth:1,
        padding:12,
        backgroundColor:'#f9f9f9',
        
        textTransform:"uppercase",
    },
    searchIcon :{
        position:"absolute",
        right:13,
        top:10,
    },
    searchImage:{
        width:30,
        height:30,
    }
    
})