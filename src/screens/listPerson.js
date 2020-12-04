import React from 'react'
import {StyleSheet, Text, View,ActivityIndicator,FlatList,TouchableOpacity} from 'react-native'
import {Avatar} from 'react-native-elements'
import {size} from 'lodash'
export default function ListPerson(props){
    const {listPersonas} = props;
  //const listPersonas = [];
    return(
       
        <View style={styles.container}>
            {size(listPersonas) > 0 ? (
                <FlatList
                data={listPersonas}
                renderItem={(person) => <Personas person={person}/>}
                keyExtractor={(item, index) =>index.toString()}
                />
             ) : (
                <View style={styles.loaderPerson}>
                 <ActivityIndicator size="large" color="#00ff00" />
                 <Text>Cargando listado de personas</Text>
                </View>    
             )}
           
        </View>
    )
}
function Personas(props){
    const {person} = props;
    const {nombre,descripcion} = person.item;
    const goPersonaView = () =>{
        console.log('ok')
    }
    return(
        <TouchableOpacity onPress={goPersonaView}>
           <View style={styles.viewPersona}> 
              <View style={styles.viewPersonaImage}>
               <Avatar
                 rounded
                 size='large'
                 containerStyle={styles.userInfoAvatar}
                 icon={{name: 'user', color: 'orange',type: 'font-awesome'}}
               />
               </View>
               <View >
                 <Text style={styles.personName}>{nombre}</Text>
                 <Text style={styles.personDescripcion}>{descripcion}</Text>
               </View>
               
               
               
               
           </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 32
      },
      loaderPerson: {
          marginTop : 10,
          marginBottom: 10
      },
      viewPersona: {
          flexDirection: 'row',
          margin: 10
      },
      viewPersonaImage: {
          marginRight: 15
      },
      userInfoAvatar:{
        marginRight: 20,
        borderWidth: 1,
        
      },
      personName: {
          fontWeight: 'bold',
          
      },
      personDescripcion: {
          paddingTop: 2,
          color: 'grey',
          
      },
      
})
