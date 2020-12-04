import React from 'react';
import {TextInput, StyleSheet} from 'react-native'


export default function TextArea(props){
    const {placeholder,value,onChangeText,multiline, numberOfLines}= props
    return(
        <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1.5,
        borderColor: '#9F9F9F',
        width: '95%',
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 25
       }
  });
  