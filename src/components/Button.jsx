import React from 'react';
import { StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
export default function Input(props){
    const {title, onPress}= props
    return(
        <Button
           title={title}   
           buttonStyle= {styles.btnRegistro} 
           onPress={onPress} 
        />
    )
}

const styles = StyleSheet.create({
    btnRegistro: {
        backgroundColor: '#DC143C',
        borderRadius: 10,
        width: '100%',
        marginBottom: 10
        
    }
  });
  