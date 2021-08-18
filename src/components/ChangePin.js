import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Header from "./util/Header";
import { FloatingLabelInput } from './util/FloatingLabelInput';
import { Constants } from "../Constants";
import { EventRegister } from 'react-native-event-listeners';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";

class ChangePin extends Component {
    constructor(props){
        super(props)

        this.state = {
            oldPin: null,
            oldPinError: false,
            newPinError: false,
            newPin: null,
            confirmPin: null,
            confirmPinError: false,
            isOldPasswordVisible: false,
            isNewPasswordVisible: false,
            isConfirmPasswordVisible: false,
            pin: null
        }
    }

    async componentDidMount(){
        let pin = await AsyncStorage.getItem("pin");
        pin = pin ? parseInt(pin) : null;
        this.setState({
            pin
        })
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    onOldPinChanged = (oldPin) => {
        this.setState({
            oldPin,
            oldPinError: oldPin.length != 4 && oldPin.length != 0 ? true : false
        });
    }

    onNewPinChanged = (newPin) => {
        this.setState({
            newPin,
            newPinError: newPin.length != 4 && newPin.length != 0 ? true : false
        });
    }

    onConfirmPinChanged = (confirmPin) => {
        this.setState({
            confirmPin,
            confirmPinError: confirmPin.length != 4 && confirmPin.length != 0 ? true : false
        });
    }

    submitPinChange = async () => {
        if (!this.props.connectionStatus) {
            EventRegister.emit('screenLoader', { show: false });
            EventRegister.emit('connectionLost', { show: true });
            return;
        }
        EventRegister.emit('screenLoader', { show: true });
        let oldPin = this.state.oldPin;
        let newPin = this.state.newPin;
        let confirmPin = this.state.confirmPin;
        let pin = this.state.pin;

        if(!oldPin || !newPin || !confirmPin){
            EventRegister.emit('screenLoader', { show: false })
            Alert.alert(
                "Alert",
                "Please fill out all the fields",
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => { }
                    }
                ],
                {
                    cancelable: true
                }
            );
            return;
        }
        else if(oldPin.length != 4 || newPin.length != 4 || confirmPin.length != 4){
            EventRegister.emit('screenLoader', { show: false })
            Alert.alert(
                "Alert",
                "Pin should contain exactly 4 digits.",
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => { }
                    }
                ],
                {
                    cancelable: true
                }
            );
            return;
        }
        else if(newPin != confirmPin){
            EventRegister.emit('screenLoader', { show: false })
            Alert.alert(
                "Alert",
                "New pin and confirm pin does not match.",
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => { }
                    }
                ],
                {
                    cancelable: true
                }
            );
            return;
        }
        else if(oldPin == newPin){
            EventRegister.emit('screenLoader', { show: false })
            Alert.alert(
                "Alert",
                "New pin and Old pin cannot be same",
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => { }
                    }
                ],
                {
                    cancelable: true
                }
            );
            return;
        }
        else if(oldPin != pin){
            EventRegister.emit('screenLoader', { show: false })
            Alert.alert(
                "Alert",
                "Incorrect Old Pin. Enter the correct pin and try again.",
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => { }
                    }
                ],
                {
                    cancelable: true
                }
            );
            return;
        }
        else{
            await AsyncStorage.setItem("pin", newPin.toString());
            setTimeout(() => {
                EventRegister.emit('screenLoader', { show: false });
                Toast.show('Your Pin has been changed successfully', Toast.SHORT);
                this.props.navigation.navigate("Pin");
            }, 1000);
        }
    }
    
    render(){
        return(
            <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                <Header
                    onBackPressed={this.onBackPressed} 
                    title="Change Pin"></Header>

                <Image
                    style={{ alignSelf: 'center', marginTop: 20 }}
                    source={require("../assets/pinChange.png")}>
                </Image>    

                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <FloatingLabelInput
                        style={{ marginTop: 30 }}
                        password={this.state.isOldPasswordVisible ? false : true}
                        showRightImage={this.state.oldPin && this.state.oldPin.length > 0 ? true : false}
                        onRightImageClicked={() => {
                            this.setState({
                                isOldPasswordVisible: !this.state.isOldPasswordVisible
                            })
                        }}
                        rightImageSource={this.state.isOldPasswordVisible ? require("../assets/eye.png") : require("../assets/eyeOff.png")}
                        placeholder="Enter Old Pin"
                        keyboardType={'number-pad'}
                        value={this.state.oldPin}
                        onChangeText={this.onOldPinChanged}>
                    </FloatingLabelInput>  

                    <FloatingLabelInput
                        style={{ marginTop: 30 }}
                        password={this.state.isNewPasswordVisible ? false : true}
                        showRightImage={this.state.newPin && this.state.newPin.length > 0 ? true : false}
                        onRightImageClicked={() => {
                            this.setState({
                                isNewPasswordVisible: !this.state.isNewPasswordVisible
                            })
                        }}
                        rightImageSource={this.state.isNewPasswordVisible ? require("../assets/eye.png") : require("../assets/eyeOff.png")}
                        placeholder="Enter New Pin"
                        keyboardType={'number-pad'}
                        value={this.state.newPin}
                        onChangeText={this.onNewPinChanged}>
                    </FloatingLabelInput>  

                    <FloatingLabelInput
                        style={{ marginTop: 30 }}
                        password={this.state.isConfirmPasswordVisible ? false : true}
                        showRightImage={this.state.confirmPin && this.state.confirmPin.length > 0 ? true : false}
                        onRightImageClicked={() => {
                            this.setState({
                                isConfirmPasswordVisible: !this.state.isConfirmPasswordVisible
                            })
                        }}
                        rightImageSource={this.state.isConfirmPasswordVisible ? require("../assets/eye.png") : require("../assets/eyeOff.png")}
                        placeholder="Confirm New Pin"
                        keyboardType={'number-pad'}
                        value={this.state.confirmPin}
                        onChangeText={this.onConfirmPinChanged}>
                    </FloatingLabelInput>  
                </View>

                <TouchableOpacity
                    onPress={() => this.submitPinChange()}
                    style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: Constants.colors.GREEN_SUCCESS, height: 40, marginTop: 30 }}>
                        <Text style={{ fontWeight: "700", fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    connectionStatus: state.connection.connectionStatus
});


export default connect(mapStateToProps, null)(ChangePin);