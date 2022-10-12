import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { getWatchListFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList'

class WatchList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.page = 0
        this.numberOfPages = 0
        this._getWatchList = this._getWatchList.bind(this)
    }

    componentDidMount() {
        if(this.props.session_id !== undefined) {
            this._getWatchList();
        }
    }

    _getWatchList() {
        const account_id = this.props.account_id
        const session_id = this.props.session_id
        this.setState({isLoading: true})
        const action = { type: "CLEAR_WATCHLIST", value: {} }
        this.props.dispatch(action)
        getWatchListFromApi(account_id, session_id, 1).then(data => {
            data.results.forEach(element => {
                const action = { type: "TOGGLE_WATCHLIST", value: element }
                this.props.dispatch(action)
            });
            for( var i = 2 ; i <= data.total_pages ; i++){
                getWatchListFromApi(account_id, session_id, i).then(data => {
                    const action = { type: "TOGGLE_WATCHLIST", value: data }
                    this.props.dispatch(action)
                })
            }
        }).then(data => {this.setState({isLoading: false})})
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

    _displayWatchList() {
        if(this.props.session_id !== undefined) {
            if(this.props.watchList.length !== 0) {
                return (
                    <View style={styles.main_container}>
                        <FilmList
                            favoriteList={false}
                            films={this.props.watchList}
                            navigation={this.props.navigation}
                        />
                    </View>
                )
            } else {
                return (
                    <View style={styles.main_container}>
                        {this._displayNoFilmMessage()}
                    </View>
                )
            }
        } else {
            return (
                <View style={styles.main_container_alert}>
                    <Text style={styles.bigTitle}>Watchlist</Text>
                    <Text style={styles.text}>You need to be conneted to a TMDB account in order to use this functionality. Go to your Profile page and log in.</Text>
                </View>
            )
        }
    }

    _displayNoFilmMessage() {
        if(this.state.isLoading === false){
            return (
                <View style={styles.main_container_alert}>
                    <Text style={styles.bigTitle}>Watchlist</Text>
                    <Text style={styles.text}>You haven't added any movies to your watchlist.</Text>
                    <TouchableOpacity onPress={() => this._getWatchList()}>
                        <Text style={styles.button}>Actualize</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.main_container}>
                {this._displayWatchList()}
                {this._displayLoading()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        backgroundColor: 'black'
    },
    main_container_alert: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading_container : {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
        color: 'white',
        margin: 20,
        textAlign: 'center'
    },
    button: {
        color: '#2F72E5',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5
    },
    bigTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: 'white'
    },
})

const mapStateToProps  = state => {
    return {
        session_id: state.setSession.session_id,
        accountAPI: state.setProfile.accountAPI,
        watchList: state.toggleWatchList.watchList
    }
}

export default connect(mapStateToProps)(WatchList)