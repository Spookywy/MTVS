import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, Image, ScrollView, FlatList, Platform } from 'react-native'
import {getPeopleDetails} from '../API/TMDBApi'
import { getImageFromApi } from '../API/TMDBApi'
import { getPeopleCredits } from '../API/TMDBApi'
import FilmItemSmall from './FilmItemSmall'
import { NavigationEvents } from 'react-navigation';

class PeopleDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            people: null,
            credits: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    _loadPeople() {
        this.setState({isLoading: true})
        getPeopleDetails(this.props.navigation.state.params.idPeople).then(data => {
            this.setState({
                isLoading: false,
                people: data
            })
        })
    }

    _loadCredits() {
        this.setState({isLoading: true})
        getPeopleCredits(this.props.navigation.state.params.idPeople).then(data => {
            this.setState({
                isLoading: false,
                credits: data.cast
            })
        })
    }

    _displayLoading() {
        if(this.state.isLoading){
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large'/>
            </View>
          )
        }
    }

    _displayPeopleImage() {
        if (this.state.people.profile_path) {
            return (
                <Image style={styles.people_image} source={{uri: getImageFromApi(this.state.people.profile_path)}}></Image>
            )
        } else {
            return (
                <View style={styles.people_image}>
                    <Image style={styles.people_image_default} source={require('../Images/avatar.png')}></Image>
                </View>
            )
        }
    }

    _displayPeopleDetails() {
        if(this.state.people !== null)
        return (
            <ScrollView>
                <View style={styles.head_container}>
                    {this._displayPeopleImage()}
                    <View style={styles.head_container_right}>
                        <Text style={[styles.text, styles.peopleName]}>{this.state.people.name}</Text>
                        <Text style={[styles.text, styles.title]}>Birthday</Text>
                        <Text style={[styles.text]}>{this.state.people.birthday}</Text>
                        <Text style={[styles.text, styles.title]}>Place of Birth</Text>
                        <Text style={[styles.text]}>{this.state.people.place_of_birth}</Text>
                        <Text style={[styles.text, styles.title]}>Known For</Text>
                        <Text style={[styles.text]}>{this.state.people.known_for_department}</Text>
                    </View>
                </View>
                <View style={styles.category_container}>
                    <Text style={[styles.text, styles.category_title]}>Biography</Text>
                    <Text style={[styles.text, styles.biography]}>{this.state.people.biography}</Text>
                </View>
                <View style={styles.category_container}>
                    <Text style={[styles.text, styles.category_title]}>Filmography</Text>
                    <FlatList
                        style={styles.list}
                        data={this.state.credits}
                        horizontal = {true}
                        keyExtractor={(item) => item.credit_id.toString()}
                        renderItem={({item}) => <FilmItemSmall movie={item} navigation={this.props.navigation} displayDetailForFilm={this._displayDetailForFilm}/>}
                    />
                </View>
            </ScrollView>
        )
    }

    componentDidMount() {
    }

    _getActorData(){
        this._loadPeople()
        this._loadCredits()
    }

    render(){
        return(
            <View style={styles.main_container}>
                <NavigationEvents
                    onDidFocus={() => this._getActorData()}
                />
                {this._displayPeopleDetails()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container : {
        flex: 1,
        backgroundColor: 'black'
    },
    loading_container : {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    text:{
        color: 'white'
    },
    people_image: {
      width: 144,
      height: 172.8,
      margin: 5,
      backgroundColor: 'grey',
      margin: 0,
      padding: 0,
      marginBottom: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    people_image_default: {
        width: 90,
        height: 90, 
    },
    head_container: {
        flexDirection: 'row',
        margin: 10,
    },
    peopleName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 7
    },
    head_container_right: {
        margin: 5
    },
    title: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    category_container: {
        borderTopColor: 'grey',
        borderWidth: 0.2,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 5
    },
    category_title: {
        fontSize: 18,
        marginTop: 7,
        marginBottom: 7
    },
    biography: {
        textAlign: 'justify',
        color: 'grey',
        marginBottom: 5
    }
})

export default PeopleDetails