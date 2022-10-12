import React from 'react'
import { StyleSheet, View, ActivityIndicator, SafeAreaView } from 'react-native'
import FilmList from './FilmList'
import {getNowPlaying} from '../API/TMDBApi'

class News extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.page = 0
        this.numberOfPages = 0
        this._loadFilms = this._loadFilms.bind(this)
    }

    _loadFilms() {
        this.setState({isLoading: true})
        getNowPlaying(this.page+1).then(data => {
            this.page = data.page
            this.numberOfPages = data.total_pages
            this.setState({
              films: [...this.state.films, ...data.results], // this.state.films.concat(data.results)
              isLoading: false
            })
        })
    }

    componentDidMount() {
        this._loadFilms()
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

    render() {
        return(
            <SafeAreaView style={styles.main_container}>
                <FilmList
                    favoriteList={false}
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    numberOfPages={this.numberOfPages}
                />
                {this._displayLoading()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
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
      justifyContent: 'center'
    }
})

export default News