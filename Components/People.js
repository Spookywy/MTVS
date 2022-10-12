import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class People extends React.Component {

    _displayPeopleDetails(){
        this.props.navigation.navigate("PeopleDetails", {idPeople: this.props.people.id})
    }

    _displayPeopleImage() {
        if (this.props.people.profile_path) {
            return (
                <Image style={styles.people_image} source={{uri: getImageFromApi(this.props.people.profile_path)}}></Image>
            )
        } else {
            return (
                <View style={styles.people_image}>
                    <Image style={styles.people_image_default} source={require('../Images/avatar.png')}></Image>
                </View>
            )
        }
    }
    
    render() {
        const {people} = this.props

        return(
            <TouchableOpacity onPress={() => this._displayPeopleDetails()} style={styles.main_container}>
                {this._displayPeopleImage()}
                <Text style={styles.people_name}>{people.name}</Text>
                <Text style={styles.character_name}>{people.character}</Text>
            </TouchableOpacity>
        )
    }
}

const styles =  StyleSheet.create({
    main_container: {
        backgroundColor: 'black',
        margin: 2
    },
    people_name: {
        color: 'white',
        width: 100,
        fontSize: 11,
        flexWrap: 'wrap',
        fontWeight: 'bold'
    },
    character_name: {
        color: 'white',
        fontSize: 11,
        width: 100,
        flexWrap: 'wrap',
    },
    people_image: {
      width: 100,
      height: 120,
      margin: 5,
      backgroundColor: 'grey',
      margin: 0,
      padding: 0,
      marginBottom: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    people_image_default: {
      width: 80,
      height: 80,
      
    }
})

export default People