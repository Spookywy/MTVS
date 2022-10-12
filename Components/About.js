import React from 'react'
import { StyleSheet, ScrollView, View, Text, Image, Linking, TouchableOpacity } from 'react-native'

class About extends React.Component{

    constructor(props){
        super(props)
    }

    _termsOfUse() {
        Linking.openURL('https://www.themoviedb.org/terms-of-use')
        .catch(err => console.error('An error occurred', err));
    }

    _privacyPolicy() {
        Linking.openURL('https://www.themoviedb.org/privacy-policy')
        .catch(err => console.error('An error occurred', err));
    }

    render(){
        return(
            <ScrollView style={styles.main_container}>
                <View style={styles.poweredByTMDB}>
                    <Text style={[styles.text, styles.bigTitle]}>MTVS - Movies & TV Shows</Text>
                    <Text style={[styles.text, styles.title]}>Author</Text>
                    <Text style={[styles.text, styles.author]}>MTVS is designed & developed by Valentin Menoret</Text>
                    <Text style={[styles.text, styles.title]}>Version</Text>
                    <Text style={[styles.text, styles.author]}>V1.2</Text>
                    <Text style={[styles.text, styles.title]}>Images and Data source</Text>
                    <Text style={styles.text}>This application is powered by The Movie Database.</Text>                
                    <Image source={require('../Images/TMDB_icon_transparent.png')} style={styles.logoTMDB}/>
                    <Text style={[styles.text, styles.title]}>Legal</Text>
                    <Text style={[styles.text, styles.legalText]}>Thank you for using MTVS!
                    We care deeply about your privacy, and we strive to ensure that your personal information
                    always stays safe while we work hard to provide you a service you love. MTVS doesn't store 
                    any of your data. Please find below the terms of use and the privacy policy of The Movie Database.</Text>
                    <TouchableOpacity onPress={() => this._termsOfUse()}>
                        <Text style={styles.button}>Terms of Use</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._privacyPolicy()}>
                        <Text style={styles.button}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex: 1,
        backgroundColor : 'black',
    },
    poweredByTMDB:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTMDB:{
        width: 100,
        height: 72,
        margin: 10
    },
    text: {
        color: 'white'
    },
    bigTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: 5
    },
    author:{
        marginBottom: 5
    },
    button: {
        color: '#2F72E5',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5
    },
    legalText:{
        textAlign: 'justify',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 20
    }
})

export default About