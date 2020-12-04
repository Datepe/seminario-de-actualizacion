import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ToastAndroid, Alert} from 'react-native'
import { Button, Input} from "../src/components";
var WebSocket = require('rpc-websockets').Client
var ws = new WebSocket('ws://192.168.1.7:8080')

export default function addScreen(props){
  
    const [suma,setsuma] = useState();

    
const onsubmit = () => {
   
        ws.call('sum', [5, 3]).then(function(result) {
            console.log('good')
          })
    
}

   
    return(
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Input 
        placeholder='Nombre/apellido completo'
        
       />
        <Input 
        placeholder='Direccion'
        
        secureTextEntry={false} 
        />
        <Input 
        placeholder='Descripcion'
        
        secureTextEntry={false} 
        />
        
      </View>
      <View style={styles.ButtonContainer}>
        <Button title='Agregar' 
        onPress={() => console.log(suma)}
        
        />
        <Button title='volver' 
        onPress ={onsubmit}
       />
      </View>
      
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    InputContainer: {
      width: '80%',
      margin: 10
    },
    ButtonContainer:{
      backgroundColor: '#fff',
      width: '80%',
      
    },
    TextContainer:{
        marginBottom: 20,
        flexDirection: 'row'
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor:  "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    }
  });
  