import React,{useState} from "react";
import {Button,Modal,StatusBar,Dimensions,Text,TextInput,View,ScrollView,StyleSheet,TouchableOpacity,Image, Alert} from 'react-native'


export default function MyInput({varType,varValue,onChangeFunction}){
    
   return(
       <View style={styles.container}>
           <Text style={styles.label}>
              {varType}
           </Text>
           <TextInput style={styles.myInput}  value={varValue} onChangeText={(value)=>{onChangeFunction(value)}} />
           
       </View>
   )
}
const styles=StyleSheet.create({
    container:{
        width:260,
        height:85,
       
    },
    label:{
        fontSize:14,
        color:'#f78f1e',
    },
    myInput:{
        width:260,
        height:40,
        borderBottomColor:'#f78f1e',
        borderBottomWidth:1,
        backgroundColor:"white",
    },
})