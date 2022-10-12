import React from 'react'
import { StyleSheet, View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { createRequestTokenFromApi } from '../API/TMDBApi'
import { createSessionFromApi } from '../API/TMDBApi'
import { deleteSessionFromApi } from '../API/TMDBApi'
import { getAccountDetailFromApi } from '../API/TMDBApi'

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            request_token : undefined
        }
        this.request_token
    }

    _displayProfileEdit() {
        this.props.navigation.navigate("ProfileEdit", {})
    }

    _login() {
        createRequestTokenFromApi().then(data => {
            this.setState({request_token: data.request_token})
            if(data.success) {
                Linking.openURL('https://www.themoviedb.org/authenticate/'+data.request_token)
                .catch(err => console.error('An error occurred', err));
            }
        })
    }

    _confirmLogin() {
        createSessionFromApi(this.state.request_token).then(data => {
            const action = {type: "SET_SESSION_ID", value: data.session_id}
            this.props.dispatch(action)
            // We delete the request_token in order to hide the confirm button
            this.setState({request_token: undefined})

            getAccountDetailFromApi(this.props.session_id).then(data => {
                const actionAccount = {type: "SET_ACCOUNT_API", value: data}
                this.props.dispatch(actionAccount)

                const actionName = {type: "SET_NAME", value: data.name}
                this.props.dispatch(actionName)

                const actionForeName = {type: "SET_USERNAME", value: data.username}
                this.props.dispatch(actionForeName)
            })
        })
    }

    _logout() {
        deleteSessionFromApi(this.props.session_id).then(data => {
            const action = {type: "SET_SESSION_ID", value: undefined}
            this.props.dispatch(action)
            const actionClearWatchList = {type: "CLEAR_WATCHLIST", value: undefined}
            this.props.dispatch(actionClearWatchList)
            const actionClearFavorites = {type: "CLEAR_FAVORITE_MOVIES", value: undefined}
            this.props.dispatch(actionClearFavorites)
        })
    }

    _showLoginButton() {
        if(this.props.session_id === undefined && this.state.request_token === undefined) {
            return(
                <View>
                    <Text style={styles.text}>You can sign in with a TMDB account by simply clicking on the button below. You can also create an account.</Text>
                    <TouchableOpacity onPress={() => this._login()}>
                        <Text style={styles.button}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._login()}>
                        <Text style={styles.button}>Create an account</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _showConfirmLoginButton() {
        if(this.state.request_token !== undefined && this.props.session_id === undefined) {
            return(
                <View>
                    <Text style={styles.text}>Do you confirm the connexion to your TMDB account?</Text>
                    <TouchableOpacity onPress={() => this._confirmLogin()}>
                        <Text style={styles.button}>Approve</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _showLogoutButtonAndUsername() {
        if(this.props.session_id !== undefined) {
            return(
                <View>
                    <Text style={styles.name_text}>You are logged in as {this.props.username}</Text>
                    <TouchableOpacity onPress={() => this._logout()}>
                        <Text style={styles.button}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _showAboutPage() {
        this.props.navigation.navigate("About", {})
    }

    render() {
        return(
            <ScrollView style={styles.main_container}>
                <Text style={[styles.text, styles.bigTitle]}>Welcome</Text>
                {/*
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                
                <TouchableOpacity onPress={() => this._displayProfileEdit()}>
                    <Text style={styles.button}>Edit</Text>
                </TouchableOpacity>
                */}
                {this._showLoginButton()}
                {this._showConfirmLoginButton()}
                {this._showLogoutButtonAndUsername()}
                <TouchableOpacity onPress={() => this._showAboutPage()}>
                    <Text style={[styles.button, styles.aboutButton]}>About the application</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex: 1,
        backgroundColor: 'black'
    },
    avatar_container : {
        alignItems: 'center'
    },
    name_text : {
        marginLeft: 5,
        marginRight: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        margin: 20
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
        margin: 5
    },
    aboutButton: {
        marginTop: 30
    }
})

const mapStateToProps = (state) => {
    return {
        name: state.setProfile.name,
        username: state.setProfile.username,
        session_id: state.setSession.session_id,
        accountAPI: state.setProfile.accountAPI
    }
}

export default connect(mapStateToProps)(Profile)