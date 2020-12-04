import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import AuthLoading from '../screens/AuthLoading'
import AccountScreen from '../screens/Account'
import EncontradasScreen from '../screens/Encontradas'
import PerdidasScreen from '../screens/Perdidas'
import addScreens from '../Utils/addScreen'

const OnBoardingNavigator = createSwitchNavigator({
    Login : LoginScreen,
    Register: RegisterScreen,
    Agregar : addScreens,
}, {initialRouteName: 'Login'})


const appNavigator = createBottomTabNavigator({
    Account : {
        screen : AccountScreen,
        navigationOptions: () => ({
            tabBarLabel: 'Mi Cuenta',
            
            tabBarIcon: ({ tintColor}) => (
             <Icon
               type='material-community'
               name='home-outline'
               size={22}
               color={tintColor}               
             />
         )
          })
    },
    Encontradas : {
        screen : EncontradasScreen,
        navigationOptions: () => ({
            tabBarLabel: 'Encontradas',
            tabBarIcon: ({ tintColor}) => (
                <Icon
                  type='material-community'
                  name='account-multiple-check'
                  size={22}
                  color={tintColor}               
                />
            )
        })
    },
    Perdidas : {
        screen : PerdidasScreen,
        navigationOptions: () => ({
            tabBarLabel: 'Perdidas',
            tabBarIcon: ({ tintColor}) => (
                <Icon
                  type='material-community'
                  name='account-multiple-minus'
                  size={22}
                  color={tintColor}               
                />
            )
        })
    }
},{
    initialRouteName: 'Account',
    order: ['Encontradas','Perdidas','Account'],
    tabBarOptions: {
        inactiveTintColor: '#FFFFFF',
        activeTintColor: '#00E0FF',
        style: {
            backgroundColor: '#FF0000',
          }
        
      }
})



const baseStack = createSwitchNavigator({
    AuthLoading,
    OnBoarding: OnBoardingNavigator,
    Root: appNavigator
},{initialRouteName: 'AuthLoading'})

export default createAppContainer(baseStack)