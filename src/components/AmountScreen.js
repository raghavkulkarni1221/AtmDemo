import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Constants } from "../Constants";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAmount } from '../actions/amount';
import Header from './util/Header';

class AmountScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            amount: null
        }
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    render(){
        return(
            <View style={{ width: '100%', height: '100%' }}>
                <Header
                    onBackPressed={this.onBackPressed} 
                    title=""></Header>
                <View style={{ width: '100%', height: "90%", flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                    <Text style={{ fontWeight: "700", fontSize: Constants.fontSizes.EXTRA_LARGE, color: Constants.colors.GREEN_SUCCESS, alignSelf: 'center' }}>Enter amount to be withdrawn</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 40, marginTop: 20 }}>&#x20B9;</Text>
                        <TextInput
                            style={{ alignSelf: 'center', borderBottomWidth: 0, textAlign: 'center', marginTop: 20, fontSize: 50 }}
                            placeholder={"0"}
                            autoFocus
                            onChangeText={(value) => {
                                this.setState({
                                    amount: value
                                })
                            }}
                            keyboardType={'number-pad'}
                            value={this.state.amount}></TextInput>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            let amount = this.state.amount;
                            this.props.updateAmount(amount);
                            this.props.navigation.navigate("Denominations")
                        }}
                        style={{ width: '80%', height: 40, backgroundColor: this.state.amount > 0 ? Constants.colors.GREEN_SUCCESS : Constants.colors.PRIMARY_GREY, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                            <Text style={{ fontWeight: "700", fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE }}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    connectionStatus: state.connection.connectionStatus,
    amount: state.amount.amount
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateAmount
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AmountScreen);