import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform, Linking, Alert, FlatList } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi, getFilmVideosFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { addToWatchListFromApi } from '../API/TMDBApi'
import { addToFavoriteFromApi } from '../API/TMDBApi'
import { getCreditsFromApi } from '../API/TMDBApi'
import People from './People'
import { NavigationEvents } from 'react-navigation';
import { BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation';

class FilmDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        if(params.film != undefined && Platform.OS === 'ios') {
            return {
                /*headerRight: <TouchableOpacity
                    style={styles.share_touchable_headerRightButton}
                    onPress={() => params.shareFilm()}>
                    <Image style={styles.share_image} source={require('../Images/ic_share.png')}/>
                </TouchableOpacity>*/
            }
        } else {
            return{
                headerLeft:(<HeaderBackButton onPress={()=>{params.handleBackButtonClick()}}/>)
            }
        }
    }

    constructor(props){
        super(props)
        this.state = {
            film: undefined,
            cast: undefined,
            isLoading: true
        }
        this.trailerURL
        this._shareFilm = this._shareFilm.bind(this)
        this._filmScrollView = React.createRef();
        this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film,
            handleBackButtonClick: this._handleBackButtonClick
        })
    }

    componentDidMount() {
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackButtonClick);
    }

    _handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    _getFilmData() {
        if(this.state.film != undefined){
            if(this.state.film.id == this.props.navigation.state.params.idFilm){
                return;
            }
        }
        if(this.refs._filmScrollView != undefined){
            this.refs._filmScrollView.scrollTo({x:0, y:0, animated: false});
        }
        this.setState({
            isLoading: true
        })
        var promiseGetFilmDetail = getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
            }, () => {this._updateNavigationParams() })
        })
        var promiseGetCredits = getCreditsFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                cast: data.cast
            })
        })
        var promiseGetFilmVideos = getFilmVideosFromApi(this.props.navigation.state.params.idFilm).then(data => {
            if(data.results[0]) {
                this.trailerURL = 'https://www.youtube.com/watch?v=' + data.results[0].key
            } else {
                this.trailerURL = 'https://www.youtube.com/'
            }
        })

        Promise.all([promiseGetFilmDetail,promiseGetCredits,promiseGetFilmVideos]).then(data => {
            this.setState({
                isLoading: false
            })
        })
    }

    _toggleFavorite() {
        if(this.props.session_id === undefined) {
            Alert.alert('Login Required','You need to be conneted to a TMDB account in order to use this functionality.')
        } else {
            const account_id = this.props.accountAPI.id
            const session_id = this.props.session_id
            const media_type = 'movie'
            const media_id = this.state.film.id
            var favorite = true
            if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
                favorite = false
            }
            addToFavoriteFromApi(account_id, session_id, media_type, media_id, favorite).then(data => {
                const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
                this.props.dispatch(action)
            })
        }
    }

    _displayWatchListImage() {
        var sourceImage = require('../Images/baseline_playlist_add_white_48dp.png')
        if(this.props.watchList.findIndex(item => item.id === this.state.film.id) !== -1){
            sourceImage = require('../Images/baseline_playlist_add_check_white_48dp.png')
        }
        return (
                <Image source={sourceImage} style={styles.list_image}/>
        )
    }

    _displayFavoriteImage() {
        var shouldEndLarge = false
        var sourceImage = require('../Images/ic_favorite_border.png')
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
            sourceImage = require('../Images/ic_favorite.png')
            shouldEndLarge = true
        }
        return (
                <Image source={sourceImage} style={styles.favorite_image}/>
        )
    }

    _addToWatchList() {
        if(this.props.session_id === undefined) {
            Alert.alert('Login Required','You need to be conneted to a TMDB account in order to use this functionality.')
        } else {
            const account_id = this.props.accountAPI.id
            const session_id = this.props.session_id
            const media_type = 'movie'
            const media_id = this.state.film.id
            var watchlist = true
            if(this.props.watchList.findIndex(item => item.id === this.state.film.id) !== -1) {
                watchlist = false
            }
            addToWatchListFromApi(account_id, session_id, media_type, media_id, watchlist).then(data => {
                const action = { type: "TOGGLE_WATCHLIST", value: this.state.film }
                this.props.dispatch(action)
            })
        } 
    }

    _openTrailer() {
        Linking.openURL(this.trailerURL).catch(err => console.error('An error occurred', err));
    }

    _displayMovieImage() {
        if (this.state.film.poster_path) {
            return (
                <Image style={styles.poster_image} source={{uri: getImageFromApi(this.state.film.poster_path)}}></Image>
            )
        } else {
            return (
                <View style={styles.poster_image}>
                    <Image style={styles.poster_image_default} source={require('../Images/video-camera.png')}></Image>
                </View>
            )
        }
      }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView ref='_filmScrollView' style={styles.scrollview_container}>
                    <Image style={styles.movie_image} blurRadius={2.5} source={{uri: getImageFromApi(film.backdrop_path)}}></Image>
                    {this._displayMovieImage()}
                    <Text style={[styles.text, styles.title_text]}>{film.title}</Text>
                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => this._addToWatchList()}>{this._displayWatchListImage()}</TouchableOpacity>
                        <TouchableOpacity onPress={() => this._toggleFavorite()}>{this._displayFavoriteImage()}</TouchableOpacity>
                        <TouchableOpacity onPress={() => this._openTrailer()}><Image style={styles.play_image} source={require('../Images/ic_play_arrow_white.png')}></Image></TouchableOpacity>
                    </View>
                    <View style={styles.parts_container}>
                        <Text style={styles.parts_titles}>Overview</Text>
                        <Text style={[styles.text, styles.overview_text]}>{film.overview}</Text>
                    </View>

                    <View style={styles.parts_container}>
                        <Text style={styles.parts_titles}>Distribution</Text>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Production Companies:</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{film.production_companies.map((element) => {return element.name}).join(' / ')}</Text>
                        </View>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Production Countries:</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{film.production_countries.map((element) => {return element.name}).join(' / ')}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.parts_container}>
                        <Text style={styles.parts_titles}>Informations</Text>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Release:</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Note:</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{film.vote_average}</Text>
                        </View>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Number of votes:</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{film.vote_count}</Text>
                        </View>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Budget:</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{numeral(film.budget).format('0,0[.]00 $')}</Text>
                        </View>
                        <View style={styles.informations_element_container}>
                            <Text style={[styles.text, styles.informations_element_label]}>Genre(s):</Text>
                            <Text style={[styles.text, styles.informations_element_text]}>{film.genres.map((element) => {return element.name}).join(' / ')}</Text>
                        </View>
                    </View>
                    <View style={styles.parts_container}>
                        <Text style={styles.parts_titles}>Actors</Text>
                        <FlatList
                            style={styles.list}
                            data={this.state.cast}
                            horizontal = {true}
                            keyExtractor={(item) => item.cast_id.toString()}
                            renderItem={({item}) => <People people={item} navigation={this.props.navigation}/>}
                        />
                    </View>
                </ScrollView>
            )
        }
    }

    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title,  message: film.overview })
    }

    _displayFloatingActionButton() {
        const { film } = this.state
        if( film !== undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity style={styles.share_touchable_floatingActionButton} onPress={() => this._shareFilm()}>
                    <Image style={styles.share_image} source={require('../Images/ic_share.png')}/>
                </TouchableOpacity>
            )
        }
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
        // const idFilm = this.props.navigation.getParam('idFilm')
        const idFilm = this.props.navigation.state.params.idFilm
        return (
            <View style={styles.main_container}>
                <NavigationEvents
                    onDidFocus={() => this._getFilmData()}
                />
                {this._displayFilm()}
                {this._displayLoading()}
                {/*this._displayFloatingActionButton()*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    scrollview_container: {
        flex: 1,
        backgroundColor: 'black',
    },
    movie_image: {
        height: 160,
        backgroundColor: 'black'
    },
    poster_image: {
        width: 100,
        height: 150,
        margin: 5,
        backgroundColor: 'grey',
        borderRadius: 10,
        position: 'absolute',
        top: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    poster_image_default: {
        width: 40,
        height: 40,
    },
    text: {
        color: 'grey',
        fontSize: 13,
    },
    parts_titles: {
        color: 'white',
        fontSize: 18,
        marginTop: 7,
        marginBottom: 7
    },
    parts_container: {
        borderTopColor: 'grey',
        borderWidth: 0.2,
        margin: 7
    },
    title_text: {
        color: 'white',
        fontSize: 20,
        flexWrap: 'wrap',
        margin: 7,
        marginLeft: 110
    },
    overview_text: {
        textAlign: 'justify'
    },
    informations_element_container: {
        marginTop: 1,
        flexDirection: 'row'
    },
    informations_element_label: {
        flex: 1,
        color: 'white'
    },
    informations_element_text: {
        flex: 1,
    },
    button_container: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    list_image: {
        width: 35,
        height: 35,
        marginRight: 20
    },
    favorite_image: {
        width: 25,
        height: 25,
        top: 5,
        marginRight: 15
    },
    play_image: {
        width: 35,
        height: 35
    },
    share_touchable_floatingActionButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
})

const mapStateToProps  = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm,
        session_id: state.setSession.session_id,
        accountAPI: state.setProfile.accountAPI,
        watchList: state.toggleWatchList.watchList
    }
}
export default connect(mapStateToProps)(FilmDetail)