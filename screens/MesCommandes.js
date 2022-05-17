import React,{useState,useEffect} from "react";
import {Button,Modal,StatusBar,Dimensions,Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,Image, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {CardTwelve,CardEcomThree} from 'react-native-card-ui';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
export default function MesCommandes(){
  const [tickets,setTickets]=useState([]);
  const handleDownload=async (id)=>{
    await WebBrowser.openBrowserAsync("https://printzillas.art/orders/showTicket/"+id);
    //saveAs("http://10.0.2.2:8000/orders/showTicket/1","ticket.pdf")
    /*axios.get('http://10.0.2.2:8000/api/tickets/download/'+id)
    .then((res)=>{
      console.log('success')
    })
    .catch(err=>{
      console.log(err);
    })*/
  }
  useEffect(async()=>{
    var id=await AsyncStorage.getItem('@Id');
   axios.get('https://printzillas.art/api/tickets/myTickets/'+id)
   .then((res)=>{
     console.log(res.data);
     setTickets(res.data);
    }  
   )
   .catch(err=>{
     console.log(err)
   })
  },[])
  const navigation = useNavigation();
  return(
      <View style={styles.container}>
          <View style={styles.header} >
            <TouchableOpacity style={styles.leftArrow} onPress={()=>{navigation.replace('Home')}} >
            <Image source={require('../assets/leftWhite.png')} style={styles.leftIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>Mes Commandes</Text>
          </View>
          <ScrollView  style={styles.body}>
            {
              tickets.map((ticket,index)=>{
                return(
                  
                  <CardEcomThree
                  key={index}
                title={ticket.event_name}
                subTitle={ticket.event_description}
                price={"MAD "+ticket.price}
                image={{uri:'https://printzillas.art'+ticket.path}} // OR {{uri:"http://......"}} 
                buttonText={"Voir Ticket "}
                buttonColor={"#f78f1e"}
                onClickButton={() => handleDownload(ticket.id)}
              />
                )
              })
            }
          
          
          
          </ScrollView> 
      </View>
  )
}
const styles=StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        paddingTop:StatusBar.currentHeight,
    
    },
    header:{
        width:Dimensions.get('window').width,
        height:50,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingHorizontal:20,
        backgroundColor:'#f78f1e',
        borderColor:'black',
        
    },
    leftArrow:{
        width:20,
        height:20,
        marginRight:80,
    },
    leftIcon:{
        width:20,
        height:18,
    },
    title:{
        fontSize:19,
        color:'white',
    },
    body:{
        
    },
    
})