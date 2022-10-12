import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if(this.props.isFilmFavorite){
      var sourceImage = require('../Images/ic_favorite.png')
      return (
        <Image source={sourceImage} style={styles.favorite_image}/>
      )
    }
    
  }

  _displayMovieImage() {
    if (this.props.film.poster_path) {
        return (
          <Image style={styles.movie_image} source={{uri: getImageFromApi(this.props.film.poster_path)}}></Image>
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
    // the line above is equal to :
    // const film = this.props.film
    // and
    // const displayDetailForFilm = this.props.displayDetailForFilm
    const { isFilmFavorite, film, displayDetailForFilm} = this.props
    
    return (
      <TouchableOpacity onPress={() => displayDetailForFilm(film.id)} style={styles.main_container}>
        {this._displayMovieImage()}
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            {this._displayFavoriteImage()}
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.release_container}>
            <Text style={styles.release_text}>Release on the {film.release_date}</Text>
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
  movie_image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  movie_image_default: {
    width: 40,
    height: 40,
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
    fontSize: 15,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: 'white'
  },
  vote_text: {
    color: 'grey',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15,
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    color: 'grey',
    fontSize: 12
  },
  release_container: {
    flex: 1,
  },
  release_text: {
    textAlign: 'right',
    fontSize: 12,
    color: 'white'
  },
  favorite_image: {
    width: 16,
    height: 16,
    margin: 2,
  }
})

export default FilmItem
