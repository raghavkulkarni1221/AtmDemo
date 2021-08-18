import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Image, StyleSheet, SafeAreaView } from "react-native";
import { Constants } from '../Constants';

export default class SplashScreen extends Component {
    async componentDidMount(){
        let pin = await AsyncStorage.getItem("pin");
        if(!pin || pin == 1234){
            AsyncStorage.setItem("pin","1234")
        }
        await AsyncStorage.setItem("pinAttempts", "2");
        await AsyncStorage.setItem("backPressedCount", "1");
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: Constants.colors.WHITE }}>
                <Image 
                    source={require('../assets/logo.jpeg')}
                    style={styles.splashImage}>
                </Image>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    splashImage: {
        flex: 1,
        width: '70%',
        resizeMode: 'contain'
    }
});