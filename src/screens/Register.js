import React from 'react';
import { StyleSheet, Text, View,ToastAndroid } from 'react-native';
import { Button, Input} from "../components";
import useForm from '../hook/useForm'
import {validateEmail} from '../Utils/Validation'
import socket from '../components/socket';
export default function App(props) {
    const {navigation} = props

    const initialState = {
        email: '',
        password: '',
        repeatPassword: ''
    }

    const onSubmit = (values) => {
      const {email, password, repeatPassword} = values
      console.log(values)
    if(!validateEmail(email)){
      ToastAndroid.show('email error', ToastAndroid.SHORT);
    }else{
        if(password === repeatPassword){
          socket.emit('regUser', values, 
          (resp) => {
            if(resp.resp === 'el usuario ya existe'){
              return ToastAndroid.show(resp.resp, ToastAndroid.SHORT);
            }
            return navigation.navigate('Login')
          });
       
        }
        else{
          ToastAndroid.show('las contraseñas no coinciden', ToastAndroid.SHORT);
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
        value = {inputs.email}
       />
        <Input 
        placeholder='Contraseña'
        onChangeText = {subscribe('password')}
        value = {inputs.password}
        secureTextEntry={true} 
        />
        <Input 
        placeholder='Repetir Contraseña'
        onChangeText = {subscribe('repeatPassword')}
        value = {inputs.repeatPassword}
        secureTextEntry={true} 
        />
        
      </View>
      <View style={styles.ButtonContainer}>
        <Button title='Registrarse' 
        onPress={handleSubmit}
        
        />
        <Button title='volver' 
        onPress ={() => navigation.navigate('Login')}
       
        />
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
