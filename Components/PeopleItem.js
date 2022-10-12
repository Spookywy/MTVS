import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class PeopleItem extends React.Component {

    constructor(props) {
        super(props)
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
        const { people, displayDetailForPeople } = this.props
        
        return (
          <TouchableOpacity onPress={() => displayDetailForPeople(people.id)} style={styles.main_container}>
            {this._displayPeopleImage()}
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{people.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
        marginBottom: 10
    },
    list: {
        flex: 1
    },
    people_image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
    },
    title_text: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        paddingRight: 5,
        color: 'white'
    },
    people_image_default: {
      width: 90,
      height: 90, 
    }
})

export default PeopleItem