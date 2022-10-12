import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native'
import Avatar from './Avatar'
import { connect } from 'react-redux'

class ProfileEdit extends React.Component {

    constructor(props) {
        super(props)
        this.name = this.props.name
        this.username = this.props.username

        this._changeName = this._changeName.bind(this)
    }

    _nameTextInputChanged(text) {
        this.name = text
    }

    _changeName() {
        const action = {type: "SET_NAME", value: this.name}
        this.props.dispatch(action)
    }

    _usernameTextInputChanged(text) {
        this.username = text
    }

    _changeUsername() {
        const action = {type: "SET_USERNAME", value: this.username}
        this.props.dispatch(action)
    }

    _updateProfile() {
        this._changeName()
        this._changeUsername()
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <View style={styles.secondary_container}>
                    <View style={styles.element_container}>
                        <Text style={[styles.text, styles.element_label]}>Username</Text>
                        <TextInput onChangeText={(text) => this._usernameTextInputChanged(text)} style={[styles.text, styles.element_text]} placeholderTextColor="grey" defaultValue={this.props.username}/>
                    </View>
                    <View style={styles.element_container}>
                        <Text style={[styles.text, styles.element_label]}>Name</Text>
                        <TextInput onChangeText={(text) => this._nameTextInputChanged(text)} style={[styles.text, styles.element_text]} placeholderTextColor="grey" defaultValue={this.props.name}/>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this._updateProfile()}>
                        <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
                <Text style={styles.warning_text}>These changes are specific to the MTVS application and will not affect your account "The Movie DB".</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex: 1,
        backgroundColor: 'black'
    },
    secondary_container: {
        marginTop: 20,
        marginBottom: 20,
        margin: 10
    },
    avatar_container : {
        alignItems: 'center'
    },
    text: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 15
    },
    element_container: {
        marginTop: 1,
        flexDirection: 'row',
    },
    element_label: {
        flex: 1,
        color: 'white'
    },
    element_text: {
        flex: 1,
    },
    warning_text: {
        color: 'white',
        margin: 20,
        textAlign: 'justify'
    },
    button: {
        color: '#2F72E5',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5
    }
})

const mapStateToProps = (state) => {
    return {
        name: state.setProfile.name,
        username: state.setProfile.username
    }
}

export default connect(mapStateToProps)(ProfileEdit)