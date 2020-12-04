import React from 'react';
import { View} from 'react-native'
import {SocialIcon } from 'react-native-elements'

export default function socialIcon(props){
    const {title}= props
    return(
        <View>
        <SocialIcon
           title='Sign In With Facebook'
           button
           type='facebook'
        />
        <SocialIcon
           title='Sign In With google'
           button
           type='google'
        />
                
        </View>
        
    )
}


  