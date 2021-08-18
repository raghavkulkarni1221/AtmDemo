import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Constants } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from 'react-native-event-listeners';

export default class Pin extends Component {
    constructor(props){
        super(props)

        this.state = {
            code: "",
            pin: ""
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener("focus", async () => {
            let pin = await AsyncStorage.getItem("pin");
            this.setState({
                pin
            })
        })
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    render(){
        return(
            <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                <Image
                    resizeMode={"contain"} 
                    style={{ width: "70%", alignSelf: 'center', marginTop: -20 }}
                    source={require("../assets/logo.jpeg")}></Image>
                <Text style={{ width: '100%', fontWeight: 'bold', fontSize: Constants.fontSizes.EXTRA_LARGE, color: Constants.colors.GREEN_SUCCESS, textAlign: 'center', marginTop: -20 }}>Enter your PIN to login</Text>
                <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <OTPInputView
                        style={{width: '80%', height: 100, marginTop: 20 }}
                        pinCount={4}
                        code={this.state.code} 
                        onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled = {async (code) => {
                            if(code === this.state.pin){
                                await AsyncStorage.setItem("pinAttempts", "2");
                                this.setState({
                                    code: ""
                                },() => {
                                    EventRegister.emit('screenLoader', { show: true });
                                    setTimeout(() => {
                                        EventRegister.emit('screenLoader', { show: false });
                                        this.props.navigation.navigate("Menu");
                                    },2000);
                                });
                            }
                            else {
                                let attempts = await AsyncStorage.getItem("pinAttempts");
                                attempts = parseInt(attempts);
                                if(attempts > 0){
                                    Alert.alert(
                                        "Alert",
                                        "You have entered the wrong pin. You have " + attempts + " more attempts left",
                                        [
                                            {
                                                text: 'Okay',
                                                style: 'cancel',
                                                onPress: async () => { 
                                                    this.setState({
                                                        code: ""
                                                    })
                                                    attempts = parseInt(attempts) - 1;
                                                    await AsyncStorage.setItem("pinAttempts", attempts.toString());
                                                }
                                            }
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    );
                                }
                                else {
                                    Alert.alert(
                                        "Alert",
                                        "You account has been blocked for security reasons. Please contact your nearest branch or wait for 30mins to try again.",
                                        [
                                            {
                                                text: 'Okay',
                                                style: 'cancel',
                                                onPress: () => { 
                                                    this.setState({
                                                        code: ""
                                                    });
                                                }
                                            }
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    );
                                }
                                
                            }
                        }}
                    />
                </View>
                <Text style={{ fontWeight: "bold", fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.GREEN_SUCCESS, alignSelf: 'center' }}>Forgot Pin?</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 40,
      height: 45
    },
   
    underlineStyleBase: {
      width: 50,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: "#909090",
      color: Constants.colors.GREEN_SUCCESS,
      fontSize: Constants.fontSizes.EXTRA_LARGE
    },
   
    underlineStyleHighLighted: {
      borderColor: Constants.colors.GREEN_SUCCESS,
    },
  });