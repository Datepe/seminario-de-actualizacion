import React, {useEffect, useState} from 'react';
import { StyleSheet,View} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements'
import { Button} from "../components";
import ListPerson from './listPerson'
var WebSocket = require('rpc-websockets').Client
var ws = new WebSocket('ws://192.168.1.5:8080')

export default function perdidas(props){
  
  const[listaPerson, setListaPeson] = useState([]);

  const onsubmit = () => {
       ws.subscribe('listaPersonas')
       ws.call('listaPersonas').then((result) => {
        setListaPeson(result)
    })
      console.log(listaPerson)
    }

   /* useEffect(() =>{
      console.log('entro')
      ws.call('listaPersonas').then((result) => {
        setListaPeson(result)
    })
      console.log(listaPerson)
      listaPerson.forEach( elemt => {
        console.log('entro2')
     })
    },[])*/

  return (
    <View style={styles.container}> 
    <ListPerson listPersonas={listaPerson}/>
      <Button title='Agregar' onPress={onsubmit}/>
      <AcctionButton />
             
      </View>
    )
}

function AcctionButton(props){
  
  return (
      <ActionButton buttonColor="#FF7C00">
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Notificar persona perdida"
        onPress={() => {}}>
        <Icon
               type='material-community'
               name='account'
               color='white'
               size={22}
                             
             />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Mapa"
        onPress={() => {}}>
        <Icon
               type='material-community'
               name='map-marker'
               color='white'
               size={22}
                             
             />
      </ActionButton.Item>
      </ActionButton>
      
    );
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});