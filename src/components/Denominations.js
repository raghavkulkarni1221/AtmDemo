import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAmount } from '../actions/amount';
import { Constants } from "../Constants";
import Header from "./util/Header";

class Denominations extends Component {
    constructor(props){
        super(props)

        this.state = {
            amount: 1050,
            notes: [ 2000, 500, 200, 100, 50, 20, 10, 5, 2, 1 ]
        }
    }

    countCurrency = () => {
        let amount = this.props.amount;
        if(amount){
            let notes = this.state.notes;
            let noteCounter = Array(10).fill(0);
            
            for (let i = 0; i < notes.length; i++) {
                if (amount >= notes[i]) {
                    noteCounter[i] = Math.floor(amount / notes[i]);
                    amount = amount - noteCounter[i] * notes[i];
                }
            }
            
            return noteCounter;
        }
        return [];
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    render(){
        return(
            <View style={{ width: "100%", height: "100%" }}>
                <Header
                    onBackPressed={this.onBackPressed} 
                    title="Amount Dispensed"></Header>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: "90%" }}>
                    <Text style={{ width: "80%", fontWeight: '700', fontSize: Constants.fontSizes.EXTRA_LARGE, color: Constants.colors.SECONDARY_GREY, marginBottom: 20, textAlign: 'center' }}>Following Currency will be dispensed through the machine</Text>
                    {this.countCurrency().map((item,index) => {
                        let notes = this.state.notes;
                        if(item != 0){
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, width: "60%", alignSelf: 'center' }}>
                                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: "700", fontSize: 22, color: Constants.colors.PRIMARY,  }}>&#x20B9;{notes[index]}</Text>
                                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: "700", fontSize: 22, color: Constants.colors.PRIMARY,  }}>{"x"}</Text>
                                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: "700", fontSize: 22, color: Constants.colors.PRIMARY,  }}>{item}</Text>
                                </View>
                            )
                        }
                        return null;
                    })}
                    <View style={{ width: "70%", alignSelf: 'center', backgroundColor: Constants.colors.BLACK, height: 2, marginTop: 10 }}>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: "60%", marginTop: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "700", fontSize: 22, color: Constants.colors.BLACK }}>TOTAL</Text>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "700", fontSize: 22, color: Constants.colors.BLACK }}>-</Text>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "700", fontSize: 22, color: Constants.colors.BLACK }}>{this.props.amount}</Text>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Denominations);