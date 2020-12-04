import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import {SocialIcon, Button, Input} from "../components";
import useForm from '../hook/useForm'
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
//import Loading from '../screens/Loading'
import socket from '../components/socket';
import {validateEmail} from '../Utils/Validation'

export default function login(props) {
  const {navigation} = props
  const [conexion,setConexion] = useState(false);
  const[loading, setLoading] = useState(false)
  const initialState = {
    email: '',
    password: '',
}

useEffect(() =>{
  const emit =socket.emit("verificarConexion");
  if(!emit.disconnected){
    setConexion(true)
    ToastAndroid.show('servidor conectado', ToastAndroid.SHORT);
  }else{
    ToastAndroid.show('servidor no conectado', ToastAndroid.SHORT);
  }
    
},[]);


const onSubmit = (values) => {
  const {email} = values
  
  if(!validateEmail(email)){
    ToastAndroid.show('email error2', ToastAndroid.SHORT);
  }else{
     if(conexion){
      socket.emit('validateUser', values, 
    (resp) =>{
      if(resp.resp === 'error'){
        return ToastAndroid.show('usuaio y/o contraseña incorrecto', ToastAndroid.SHORT);
      }
      return navigation.navigate('Account',{socket})
    })
    }
  }
}

const {subscribe, handleSubmit, inputs} = useForm(initialState, onSubmit)
  return (

    <View style={styles.container}>
       
      <View style={styles.InputContainer}>
      <Input 
        placeholder='Correo Electronico'
        onChangeText = {subscribe('email')}
        value = {inputs.email} />
        <Input 
        placeholder='Contraseña'
        onChangeText = {subscribe('password')}
        value = {inputs.password}
        secureTextEntry={true} 
        />
      </View>
      <View style={styles.TextContainer}> 
          <Text>¿Aun no estas registrado?</Text>
          <Text 
          onPress={() => navigation.navigate('Register')}
          style={{color: '#00a680',}}
          >
              Registrase
          </Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Button title='Iniciar Sesion' onPress={handleSubmit}/>
        <SocialIcon/>
      </View>
     
      
    </View>
  );
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
  }
});
