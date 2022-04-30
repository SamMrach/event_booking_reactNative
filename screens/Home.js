import React,{useRef,useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import {Button,Image,Text,View,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import Category from "../Components/Category";
import Header from '../Components/Header'
import Event from '../Components/Event'
import { DrawerLayout } from "react-native-gesture-handler";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import store from 'react-native-simple-store';
export default function Home(){
    const drawer = useRef(null);
    //const{name}=route.params;
    const [username,setUsername]=useState('');
    const [image,setImage]=useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const [events,setEvents]=useState([]);
    const [favoris,setFavoris]=useState([]);
    const [loading, setLoading] = useState(true);
    //filter favorited events
    const filterFavoris=()=>{
      const favorisEvents=events.filter((event)=>favoris.includes(event.name));
      setEvents(favorisEvents);
    }
    //toggle favoris
    const addOrRemoveToFavoris=async(itemName)=>{
      //console.log(favoris.includes(itemName)); 
      let index=favoris.indexOf(itemName);
      //console.log(index);
      //setFavoris([...favoris],itemName)
      var temp=favoris;
      favoris.includes(itemName) ? (temp.splice(index,1) && setFavoris([...temp])) : setFavoris([...favoris,itemName]);
      //AsyncStorage.setItem('@favoris',favoris);
      //await AsyncStorage.setItem('@favoris',JSON.stringify(favoris));
      
    }
    const handleClick=(param1)=>{
      axios.get('http://10.0.2.2:8000/api/events/category/'+param1)
      .then((res)=>{
         setEvents(res.data);
      })
      .catch((err)=>{
        alert(err)
      })
    }
    const handleSearch=(keyword)=>{
      axios.get('http://10.0.2.2:8000/api/events/search/'+keyword)
      .then((res)=>{
        setEvents(res.data);
      })
      .catch((err)=>{
        alert(err)
      })
    }
    useEffect(async()=>{
      if(!loading){
      try{
      const jsonValue=await AsyncStorage.setItem('@favoris',JSON.stringify(favoris));
      return jsonValue;
      }
      catch(e){
       alert(e)
      } 
    }
    },[favoris])

    useEffect(async() => {
      
       let fullName=await AsyncStorage.getItem('@username');
       setUsername(fullName);
       let profilImage=await AsyncStorage.getItem('@Image');
       JSON.parse(profilImage);
       if(profilImage == null)
       setImage(profilImage);
       setLoading(false);
       try{
          const favArray= await AsyncStorage.getItem('@favoris');
       const favArray2=JSON.parse(favArray);
       if(favArray2 !== null){
         setFavoris(favArray2);
         //console.log(favoris);
       }
       }
       catch(e){
         alert(e);
       }
        axios.get('http://10.0.2.2:8000/api/events')
        .then(res=>{
          console.log(res.data[0].image)
          
          setEvents(res.data);
          
        })
        .catch((err)=>{
          alert(err)
        })
      
    }, [])
    const navigation =useNavigation();
    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
         <View style={styles.header}>
            <Image source={{uri:image}} style={styles.userIcon}></Image>
            <Text style={styles.userName}>{username}</Text>
         </View>
         <View style={styles.options}>
             <TouchableOpacity style={styles.option} onPress={()=>{navigation.replace('Home')}} >
               <Image style={styles.optionIcon} source={require('../assets/accueil.png')} />
               <Text style={styles.optionName}>Accueil</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.option} onPress={()=>{navigation.replace('Profile')}} >
               <Image style={styles.optionIcon} source={require('../assets/mesInfo.png')} />
               <Text style={styles.optionName}>Mes Info</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.option} onPress={()=>{filterFavoris()}}>
               <Image style={styles.optionIcon} source={require('../assets/favorite.png')} />
               <Text style={styles.optionName}>Mes Favoris</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.option} onPress={()=>{navigation.replace('LoginScreen')}} >
               <Image style={styles.optionIcon} source={require('../assets/favorite.png')} />
               <Text style={styles.optionName}>Déconnecter</Text>
             </TouchableOpacity>
         </View>
        </View>
      );
      const openMyDrawer =()=>{
        drawer.current.openDrawer();
      }
    return (
       <DrawerLayout
       ref={drawer}
       drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={navigationView}>
       <Header  myDrawer={drawer} name={username} onSearch={handleSearch} />
       <ScrollView style={styles.body}>
        <ScrollView style={styles.categories} horizontal>
            <Category category="theatre" onclick={handleClick} path="require('../assets/theatre.png')"/>
            <Category category="Festivals" onclick={handleClick} path="require('../assets/theatre.png')"/>
            <Category category="Formations" onclick={handleClick}path="require('../assets/theatre.png')"/>
            
        </ScrollView>
        <Text style={styles.text}>Encore plus de nouveautés</Text>
        <View style={styles.events}>
          {events.map((item,index)=>{
            //console.log(item.name);
           return(<Event key="{item.id}" id={item.id} name={item.name} category={item.category} description={item.description} price={item.price} localisation={item.localisation} image={item.image} date={item.date} onclick={addOrRemoveToFavoris}  listOfFavoris={favoris}/>)
           
          })}
           
        </View>
       </ScrollView>
       </DrawerLayout>
      
    )
}
const styles=StyleSheet.create({
    body:{
      backgroundColor:'#f9f9f9',
    },
    categories:{
        flexDirection:"row",
        marginTop:10,
        marginBottom:10,
        height:60,
    },
    text:{
        fontSize:22,
        color:'#191919',
        padding:12,
    },
    events:{
        paddingHorizontal:15,
    },



    container: {
        flex: 1,
        alignItems: "flex-start",
        
      },
      navigationContainer: {
        backgroundColor: "#ecf0f1"
      },
      paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
      },
      header:{
          width:300,
          height:150,
          justifyContent:"space-around",
          alignItems:"center",
          borderBottomColor: '#DCDCDC',
          borderBottomWidth: 1,
          paddingTop:15,
      },
      userIcon:{
          width:82,
          height:82,
          borderRadius:1000,
      },
      userName:{
          fontSize:18,
      },
      options:{
          width:300,
          height:300,
          padding:15,  
      },
      option:{
          width:300,
          height:50,
          flexDirection:"row",
          alignItems:"center",
          
      },
      optionIcon:{
          width:29,
          height:29,
          marginRight:15,
      },
      optionName:{
          fontSize:19,
          color:'black',
      }
})