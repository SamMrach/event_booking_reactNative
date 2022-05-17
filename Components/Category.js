import React from "react";
import {Text,View,ScrollView,StyleSheet,TouchableOpacity,Image} from 'react-native'
export default function Category({category,onclick,path}){

    return (
     <TouchableOpacity style={styles.category} onPress={()=>{onclick(category)}}>
         <Image style={styles.icon} source={category=='theatre' ? require('../assets/theatreIcon.png'):category=='Concert' ? require('../assets/festival.png'):require('../assets/formation.png') }/>
         <Text style={styles.text} >{category}</Text>
     </TouchableOpacity>
    )

}
const styles=StyleSheet.create({
    category:{
        width:160,
        height:50,
        borderRadius:4,
        backgroundColor:"#fff",
        marginHorizontal:10,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 5,
        shadowOffset: { width: 1, height: 2 },
    },
    icon:{
        width:32,
        height:32,
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        color:"#808080",
    }
})