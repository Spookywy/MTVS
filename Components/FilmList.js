import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    render() {
        return(
        <FlatList
          style={styles.list}
          data={this.props.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          onEndReachThreashold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.numberOfPages) {
              this.props.loadFilms()
            }
          }}
          renderItem={({item}) => <FilmItem isFilmFavorite={this.props.favoritesFilm.findIndex(row => row.id === item.id) !== -1} film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
        />
    )}
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)