import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ToastAndroid, Alert} from 'react-native'
import {Icon, Avatar} from 'react-native-elements'
import { Button, Input,TextArea} from "../components";
import DateTimePicker from '@react-native-community/datetimepicker';
import useForm from '../hook/useForm'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {map, size, filter} from 'lodash'
import socket from '../components/socket';
export default function addScreen(props){
    
    const {navigation} = props;
    const [imagesSelected,setImageSelected] = useState([]);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false); 
     

    const initialState = {
        nombre: '',
        direccion: '',
        descripcion: '',
        edad: '',
        date: '',
        contacto: ''
    }

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate)
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const onSubmit = (values) => {
      values.date = date.toString();
      const {nombre, direccion, descripcion} = values;
      if(nombre === "" || direccion === "" || descripcion === ""){
        ToastAndroid.show('Completar los campos', ToastAndroid.SHORT);
      }else{
        socket.emit('agregarPersona', values, 
          (resp) =>{
           if(resp.resp === 'error'){
            return ToastAndroid.show('error', ToastAndroid.SHORT);
          }
           return navigation.navigate('Account')
       });
      }
    }
    
    const {subscribe, handleSubmit, inputs} = useForm(initialState, onSubmit)
    return(
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Input 
        placeholder='Nombre/apellido completo'
        onChangeText = {subscribe('nombre')}
        value = {inputs.nombre}
       />
        <Input 
        placeholder='Direccion'
        onChangeText = {subscribe('direccion')}
        value = {inputs.direccion}
        secureTextEntry={false} 
        />
        <Input 
        placeholder='edad'
        onChangeText = {subscribe('edad')}
        value = {inputs.edad}
       />
       <Input 
        placeholder='contacto'
        onChangeText = {subscribe('contacto')}
        value = {inputs.contacto}
       />
        <TextArea 
        placeholder='Descripcion'
        onChangeText = {subscribe('descripcion')}
        value = {inputs.descripcion}
        multiline={true}
        numberOfLines={4}
        />
        
        <Button title='Show date picker!' 
        onPress={showDatepicker}/>
               
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
        <UploadImage 
        setImageSelected={setImageSelected}
        imagesSelected={imagesSelected}/>

      </View>
      <View style={styles.ButtonContainer}>
        <Button title='Agregar' 
        onPress={handleSubmit}/>
        <Button title='volver' 
        onPress ={() => navigation.navigate('Encontradas')}
       
        />
      </View>
      
    </View>
    )
}

function UploadImage(props){
    const {setImageSelected,imagesSelected}= props;
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        if(resultPermissions === 'denied'){
            ToastAndroid.show('es necesario conceder permisos', ToastAndroid.SHORT);
        }else{
           const result = await ImagePicker.launchImageLibraryAsync({
               allowsEditing: true,
               aspect: [4,3],
           });
           if(result.cancelled){
            ToastAndroid.show('no has seleccionada imagen', ToastAndroid.SHORT);   
           }else{
              // console.log(result.uri);
               setImageSelected([...imagesSelected, result.uri])
           }
        } 
    }

    const removeImage = (image) => {
     
      Alert.alert(
          'Eliminar imagen',
          'Estas seguro de eliminar la imagen?',
          [
              {
                  text: 'cancel',
                  style: 'cancel'
              },
              {
                  text: 'Eliminar',
                  onPress: () => {
                   setImageSelected(
                    filter(imagesSelected,(imageUrl) => imageUrl !== image)
                  )
               }
              }
          ],
          {cancelable: false}
      )
    }
    return(
        <View style={styles.viewImages}>
            {size(imagesSelected) < 4 && (
            <Icon
            type="materia-community"
            name="camera"
            color="#7a7a7a"
            containerStyle={styles.containerIcon}
            onPress={imageSelect}
            />
            )}
            {map(imagesSelected, (imagePerson, index) => (
              <Avatar
               key={index}
               style={styles.miniatureStyle}
               source= {{uri: imagePerson}}
               onPress= {() => removeImage(imagePerson)}
              />
            ))}
        </View>
    )

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
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor:  "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    }
  });
  