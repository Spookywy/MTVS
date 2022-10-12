import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItemSmall extends React.Component {

    constructor(props) {
        super(props)
    }

    _displayMovieImage() {
        if (this.props.movie.poster_path) {
            return (
              <Image style={styles.movie_image} source={{uri: getImageFromApi(this.props.movie.poster_path)}}></Image>
            )
        } else {
            return (
                <View style={styles.movie_image}>
                    <Image style={styles.movie_image_default} source={require('../Images/video-camera.png')}></Image>
                </View>
            )
        }
      }

    render() {

        const {movie, displayDetailForFilm} = this.props
        
        return(
            <TouchableOpacity onPress={() => displayDetailForFilm(movie.id)} style={styles.main_container}>
                {this._displayMovieImage()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'black',
        margin: 2
    },
    movie_name: {
        color: 'white',
        width: 100,
        fontSize: 11,
        flexWrap: 'wrap',
        fontWeight: 'bold'
    },
    movie_image: {
        width: 150,
        height: 240,
        margin: 5,
        backgroundColor: 'grey',
        margin: 0,
        padding: 0,
        marginBottom: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    movie_image_default: {
        width: 60,
        height: 60,
    },
})

export default FilmItemSmall