import React from 'react'
import { StyleSheet, View, TextInput, Text, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { getPeoplesFromApiWithSearchedText } from '../API/TMDBApi'
import FilmList from './FilmList'
import PeopleList from './PeopleList'

class Search extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      films: [],
      peoples: [],
      isLoading: false,
      display: 'movies',
      alreadySearchedSomething: false,
    }
    this.searchedText = ""
    this.page = 0
    this.numberOfPages = 0

    this._loadFilms = this._loadFilms.bind(this)
    this._loadPeoples = this._loadPeoples.bind(this)
  }

  _loadFilms() {
    if(this.searchedText.length > 0) {
      this.setState({isLoading: true})
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.numberOfPages = data.total_pages
        this.setState({
          films: [...this.state.films, ...data.results], // this.state.films.concat(data.results)
          isLoading: false
        })
      })
    }
  }

  _loadPeoples() {
    if(this.searchedText.length > 0) {
      this.setState({isLoading: true})
      getPeoplesFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.numberOfPages = data.total_pages
        this.setState({
          peoples: [...this.state.peoples, ...data.results], // this.state.films.concat(data.results)
          isLoading: false
        })
      })
    }
  }

  _searchData() {
    if(this.searchedText.length != 0){
      this.setState({
        alreadySearchedSomething: true
      })
    }
    this.page = 0
    this.numberOfPages = 0
    this.setState({
      films : [],
      peoples: [],
    }, () => {
      if(this.state.display == "movies"){
        this._loadFilms() 
      }
      if(this.state.display == "actors"){
        this._loadPeoples() 
      }
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

  _displaySearchUsingBox() {
    if(this.state.alreadySearchedSomething == false && this.state.isLoading == false && this.state.display!="TVShows"){
      return(
        <View style={styles.messageAlertView}>
          <Text style={[styles.text, styles.messageAlert]}>You can search a movie, a people or a tv show using the field above.</Text>
        </View>
      )
    }
  }

  _displayNoDataAvailable() {
    if(this.state.films.length == 0 && this.state.isLoading == false && this.state.display == "movies" && this.state.alreadySearchedSomething == true){
      return(
        <View style={styles.messageAlertView}>
          <Text style={[styles.text, styles.messageAlert]}>There are no movies that matched your query.</Text>
        </View>
      )
    }
    if(this.state.peoples.length == 0 && this.state.isLoading == false && this.state.display == "actors" && this.state.alreadySearchedSomething == true){
      return(
        <View style={styles.messageAlertView}>
          <Text style={[styles.text, styles.messageAlert]}>There are no actors that matched your query.</Text>
        </View>
      )
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _showMovies() {
    this.setState({
      display: 'movies'
    }, () => {
      this._searchData()
    })
  }

  _showActors() {
    this.setState({
      display: 'actors'
    }, () => {
      this._searchData()
    })
  }

  _showTVShows() {
    this.setState({
      display: 'TVShows'
    })
  }

  _displayMovies() {
    if(this.state.display == 'movies' && this.state.films.length > 0){
      return(
        <FilmList
            favoriteList={false}
            films={this.state.films}
            navigation={this.props.navigation}
            loadFilms={this._loadFilms}
            page={this.page}
            numberOfPages={this.numberOfPages}
          />
      )
    }
  }

  _displayPeoples() {
    if(this.state.display == 'actors' && this.state.peoples.length > 0){
      return(
        <PeopleList
            peoples={this.state.peoples}
            navigation={this.props.navigation}
            loadPeoples={this._loadPeoples}
            page={this.page}
            numberOfPages={this.numberOfPages}
        />
      )
    }
  }

  _displayTVShows() {
    if(this.state.display == 'TVShows'){
      return(
        <View style={styles.messageAlertView}>
          <Text style={[styles.text, styles.messageAlert]}>Coming soon.</Text>
        </View>
      )
    }
  }

  backgroundColorButton(buttonLabel) {
    if(this.state.display == 'movies' && buttonLabel == 'movies'){
      return '#2F72E5'
    }
    if(this.state.display == 'actors' && buttonLabel == 'actors'){
      return '#2F72E5'
    }
    if(this.state.display == 'TVShows' && buttonLabel == 'TVShows'){
      return '#2F72E5'
    }
    else {
      return 'black'
    }
  }

  colorButton(buttonLabel) {
    if(this.state.display == 'movies' && buttonLabel == 'movies'){
      return 'black'
    }
    if(this.state.display == 'actors' && buttonLabel == 'actors'){
      return 'black'
    }
    if(this.state.display == 'TVShows' && buttonLabel == 'TVShows'){
      return 'black'
    }
    else {
      return '#2F72E5'
    }
  }

  render(){
    return(
      <SafeAreaView style={styles.main_container}>
          <TextInput onSubmitEditing={() => this._searchData()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholderTextColor="grey" placeholder="Search for a movie, a people, a tv show..."/>
          <View style={styles.navBar}>
              <TouchableOpacity onPress={() => this._showMovies()}>
                <Text style={[{backgroundColor: this.backgroundColorButton('movies')},{color: this.colorButton('movies')},styles.navBarButton]}>Movies</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._showActors()}>
                <Text style={[{backgroundColor: this.backgroundColorButton('actors')},{color: this.colorButton('actors')},styles.navBarButton]}>Peoples</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._showTVShows()}>
                <Text style={[{backgroundColor: this.backgroundColorButton('TVShows')},{color: this.colorButton('TVShows')},styles.navBarButton]}>TV shows</Text>
              </TouchableOpacity>
          </View>
          {this._displaySearchUsingBox()}
          {this._displayNoDataAvailable()}
          {this._displayMovies()}
          {this._displayPeoples()}
          {this._displayTVShows()}
          {this._displayLoading()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex: 1,
    backgroundColor : 'black',
  },
  textInput : {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1,
    paddingLeft: 5,
    color: 'white',
    marginBottom: 5
  },
  loading_container : {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
  messageAlertView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: 'white'
  },
  navBarButton: {
    borderColor: '#2F72E5',
    borderWidth: 2,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'center'
  },
  navBar: {
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'center',
    marginBottom: 8,
  },
  messageAlert: {
    marginRight: 30,
    marginLeft: 30,
    textAlign: 'center'
  },
})

export default Search
