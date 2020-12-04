import React from 'react';

import {View, Text, StyleSheet,ImageBackground} from 'react-native';
import {Avatar} from 'react-native-elements';


export default function InfoUser(props){
     
    return(
       
        <ImageBackground source={require('../../assets/personas.jpg')} style={{width: '100%', height: 200}}>
        <View style={styles.viewUserInfo}>
            
            <Avatar
            rounded
            size='large'
            containerStyle={styles.userInfoAvatar}
            icon={{name: 'user', type: 'font-awesome', color: 'black'}}
            />
            <View style={styles.screensText}>
                <Text style={styles.displayName}>
                  nombre de usuario
                </Text>
                <Text style={{color: 'black'}}>Social Red</Text>
                 
            </View>
            
            
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',    
        paddingTop: 65,
        paddingBottom: 30,
        
    },
    userInfoAvatar: {
        marginRight: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    displayName: {
        fontWeight: 'bold',
        color: 'black'
    },
    screensText: {
        backgroundColor: 'white'
    }
});