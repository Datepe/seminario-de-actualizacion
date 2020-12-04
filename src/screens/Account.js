import React,{useEffect} from 'react'
import {StyleSheet,View} from 'react-native'
import { Button} from "../components";
import AccountOptions from '../Utils/AccountOptions'
import InfoUser from '../Utils/InfoUser'
///import socket from '../components/socket';

export default function meals(props){
  const {navigation} = props
  //const {socket} = navigation.state.params
  //console.log(navigation.state)
 
  return(
    <View style={styles.viewUserInfo}>
    <InfoUser/>
    <AccountOptions/>
    <Button title='cerrar sesion' onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}
//
const styles = StyleSheet.create({
  viewUserInfo: {
      minHeight: '100%',
      },
 
})

