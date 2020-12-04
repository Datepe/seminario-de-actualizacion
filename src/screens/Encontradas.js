import React, {useState,useEffect} from 'react';
import { StyleSheet,View} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements'
import { Button } from '../components';
import socket from '../components/socket';
import ListPerson from './listPerson'
export default function Encontradas(props) {
  const{navigation} = props
  const [listPersonas, setListPersonas] = useState([]);

  const respuesta = async () => {
    await socket.on('listPerson', (list) => {
              setListPersonas(list.x)
          })
  }

  useEffect(() => {
     respuesta()
     listPersonas.forEach( elemt => {
        console.log(elemt.nombre)
     })
     
  })

  return (
    <View style={styles.container}> 
      <ListPerson listPersonas={listPersonas}/>
      <AcctionButton navigation={navigation}/>
    </View>
    )
}




function AcctionButton(props){
 const {navigation}= props; 
  
 return (
    <ActionButton buttonColor="#FF7C00">
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Notificar persona Encontrada"
        onPress={() => navigation.navigate('Agregar')}>
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