import React,{useState,useEffect} from "react";
import { TouchableOpacity} from 'react-native-gesture-handler';
import {Text,View,ScrollView,StyleSheet,Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Event({id,name,category,description,price,localisation,image,date,onclick,listOfFavoris}){
    const [favorite,setFavorite]=useState(false);
    const navigation = useNavigation();
    useEffect(async()=>{
        //console.log('loaded');
        var favArray= await AsyncStorage.getItem('@favoris');
        JSON.parse(favArray);
        //console.log(favArray);
        favArray.includes(name) ? setFavorite(true) : setFavorite(false);
    },[])
    return (
     <View style={styles.Event}>
         <View style={styles.TouchableFavoris}>
         <TouchableOpacity  onPress={()=>{setFavorite(!favorite);onclick(name)}}>
         {
             favorite ? <Image source={require('../assets/favorite.png')} style={styles.favorisIcon}/>
             : <Image source={require('../assets/notfavorite.png')} style={styles.favorisIcon}/>
         }
        </TouchableOpacity> 
         </View>
         
         <Image style={styles.thumbnail} source={{uri:"http://10.0.2.2:8000/"+image}}/>
         <TouchableOpacity onPress={()=>{navigation.replace('Event',{id,name,category,description,price,localisation,image,date,id})}} style={styles.details}>
             <Text style={styles.price}>{price} MAD</Text>
             <Text style={styles.name}>{name}</Text>
             <View style={styles.oneRow}>
                 <Image style={styles.icon}  source={require('../assets/theatreIcon.png')}/>
                 <Text style={styles.fadeText}>{category}</Text>
             </View>
             <View style={styles.oneRow}>
                 <Image style={styles.icon} source={require('../assets/calendar.png')}/>
                 <Text style={styles.fadeText}>{date}</Text>
             </View>
             <View style={styles.oneRow}>
                 <Image style={styles.icon} source={require('../assets/localisation.png')}/>
                 <Text style={styles.fadeText}>{localisation}</Text>
             </View>
         </TouchableOpacity>
     </View>
    )

}
const styles=StyleSheet.create({
    Event:{
        width:340,
        height:340,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        borderRadius:8,
        paddingHorizontal:13,
        paddingVertical:8,
        backgroundColor:'#fff',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 5,
        shadowOffset: { width: 2, height: 2 },
        marginBottom:25,
    },
    TouchableFavoris:{
      width:30,
      height:30,
      zIndex:1000,
      position:"absolute",
      top:15,
      right:25,
      elevation:7,
    },
    favorisIcon:{
        width:30,
        height:30,
       
    },
    thumbnail:{
        width:310,
        height:150,
        borderRadius:8,
    },
    details:{
        height:170,
        paddingTop:10,
        justifyContent:"space-around",
    },
    price:{
        fontSize:24,
        color:'#f78f1e',
    },
    name:{
        color:'#000',
        fontSize:16,
        paddingVertical:8,
    },
    oneRow:{
    width:200,
      flexDirection:"row",
      height:40,
      alignItems:"center",
    },
    fadeText:{
        color:'#808080',  
    },
    icon:{
        width:20,
        height:20,
        marginRight:10,
    }
})