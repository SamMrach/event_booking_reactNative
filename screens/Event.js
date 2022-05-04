import React,{useState} from "react";
import {Button,Modal,StatusBar,Dimensions,Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,Image, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SelectBox from 'react-native-multi-selectbox'
import { Root, Popup } from 'popup-ui'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Event({route}){
    const {id,name,category,description,price,localisation,date,image}=route.params;
    const navigation = useNavigation();
    const [quantity,setQuantity]=useState(1);
    
    const K_OPTIONS = [
        {
          item: '1',
          id: '1',
        },
        {
          item: '2',
          id: '2',
        },
        {
          item: '3',
          id: '3',
        },
        {
          item: '4',
          id: '4',
        },
        {
          item: '5',
          id: '5',
        },
      ];  
      const handleBuy=async()=>{
        var user_id=await AsyncStorage.getItem('@Id');
        user_id=JSON.parse(user_id);
        //console.log(user_id);
        //console.log(id);
        axios.post('https://printzillas.art/api/tickets',{utilisateur_id:user_id,event_id:id})
        .then((res)=>{
          Popup.show({
            type: 'Success',
            title: 'Code Confirmation',
            button: true,
            textBody: res.data.code,
            buttonText: 'Ok ',
            callback: ()=> {navigation.replace('MesCommandes')}
          })
        })
        .catch((err)=>{
          console.log(err)
        })
        
      }    
    return(
      <Root>


      <View style={styles.container} >
          <View style={styles.leftArrow}>
          <TouchableOpacity  onPress={()=>{navigation.replace('Home')}}>
          <Image source={require('../assets/leftarrow.png')} style={styles.leftArrowIcon} /> 
          </TouchableOpacity>
          </View>
          <Image style={styles.image} source={{uri:'https://printzillas.art'+image}} />
          <View style={styles.details}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.body}>{description}</Text>
              <View style={styles.oneRow}>
                 <Image style={styles.icon} source={require('../assets/calendar.png')}/>
                 <Text style={styles.fadeText}>{date}</Text>
             </View>
             <View style={styles.oneRow}>
                 <Image style={styles.icon} source={require('../assets/localisation.png')}/>
                 <Text style={styles.fadeText}>{localisation}</Text>
             </View> 
             <View style={styles.oneRow}>
                 <Image style={styles.icon} source={require('../assets/price.png')}/>
                 <Text style={styles.fadeText}>{price} MAD</Text>
             </View>
            <View style={styles.btns}>
               
            
            <TouchableOpacity style={styles.button} onPress={()=>{handleBuy()}}>
              <Text style={styles.textBtn}>Acheter</Text>
            </TouchableOpacity>
            </View>
            
          </View>
          
      </View>
      </Root>
    )
}
const styles=StyleSheet.create({
    container:{
        position:"relative",
        paddingTop:StatusBar.currentHeight,

    },
    leftArrow:{
        position:"absolute",
        zIndex:1000,
        top:60,
        elevation:1000,
        left:20, 
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 18, height: 18 },
     },
     leftArrowIcon:{
        width:40,
        height:40,
        
     },
     favorite:{
      position:"absolute",
      top:60,
      elevation:1000,
      right:20, 
      shadowColor: 'black',
      shadowOpacity: 0.9,
      shadowOffset: { width: 12, height: 12 },
     },
     
    image:{
        width:Dimensions.get('window').width,
        height:250,

    },
    details:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height - 100,
        paddingTop:8,
        paddingHorizontal:14,
        position:"relative",
    },

    title:{
        fontSize:22,
        paddingVertical:8,
        color:'black',
        
    },
    category:{
      fontSize:16,
      color:'#808080',
    },
    description:{
        fontSize:19,
        paddingVertical:7,
       
    },
    body:{
        fontSize:15,
        marginBottom:10,
    },
    oneRow:{
        width:200,
          flexDirection:"row",
          height:40,
          alignItems:"center",
    },
        fadeText:{
            color:'#808080', 
            fontSize:17,
            width:300,
        },
        icon:{
            width:25,
            height:25,
            marginRight:10,
        },
    btns:{
          width:Dimensions.get('window').width,
          flexDirection:"row",
          height:50,
          marginTop:120,
          paddingLeft:10,
          
    },   
    button:{
            width:Dimensions.get('window').width -150,
            height:50,
            color:'white',
            marginHorizontal:60,
            backgroundColor:'#f78f1e',
            borderRadius:25,
                 
    },
    textBtn:{
        fontSize:20,
        color:'white',
        textAlign:"center",
        paddingTop:10,
    },
    ModalView:{
      width:Dimensions.get('window').width-100,
      height:300,
      backgroundColor:'white',
      elevation:5,
      shadowColor:'black',
      shadowOpacity:0.8,
      shadowOffset:{width: 2, height: 2},
      borderRadius:8,
      top:140,
      left:50,
    },
    modalText:{
      fontSize:12,

    },
    
})