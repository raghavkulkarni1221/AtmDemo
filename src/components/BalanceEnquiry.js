import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Constants } from "../Constants";
import Header from './util/Header';
import { EventRegister } from 'react-native-event-listeners';

export default class BalanceEnquiry extends Component {
    constructor(props){
        super(props)

        this.state = {
            showBalance: false
        }
    }

    componentDidMount(){
        EventRegister.emit('screenLoader', { show: true });
        setTimeout(() => {
            EventRegister.emit('screenLoader', { show: false });
            this.setState({
                showBalance: true
            })
        }, 2000);
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    render(){
        return(
            <View style={{ width: '100%', height: '100%', flexDirection: 'column'}}>
                <Header
                    onBackPressed={this.onBackPressed} 
                    title="Balance Enquiry"></Header>
                {this.state.showBalance ? <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '90%' }}>
                    <Text style={{ fontWeight: "500", fontSize: 24, color: Constants.colors.GREEN_SUCCESS }}>Your Account Balance is</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 32, color: Constants.colors.BLACK, marginTop: 10 }}>&#x20B9;1,62,745</Text>
                </View> : null}   
            </View>
        )
    }
}