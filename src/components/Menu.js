import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { TouchableOpacity, View, Text, BackHandler } from 'react-native';
import { Constants } from "../Constants";
import Header from './util/Header';
import Toast from 'react-native-simple-toast';

export default class Menu extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', async () => {
            let count = await AsyncStorage.getItem("backPressedCount");
            count = parseInt(count);
            if(count > 0){
                Toast.show('Press back again to exit', Toast.SHORT);
                await AsyncStorage.setItem("backPressedCount", "0");
            }
            else{
                BackHandler.exitApp();
            }
            return true;
        });
    }

    render(){
        return(
            <View style={{ width: '100%', height: '100%' }}>
                <Header
                    hideBackButton
                    title="Select an Option"></Header>
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', height: '91%', backgroundColor: Constants.colors.PRIMARY_LIGHT }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 100 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("ChangePin")} 
                            style={{ width: "40%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: Constants.colors.GREEN_SUCCESS }}>
                                <Text style={{ fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE, fontWeight: "bold" }}>CHANGE PIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("BalanceEnquiry")}
                            style={{ width: "40%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: Constants.colors.GREEN_SUCCESS }}>
                                <Text style={{ fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE, fontWeight: "bold" }}>BALANCE ENQUIRY</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 100, marginTop: 20 }}>
                        <TouchableOpacity 
                            onPress={() => alert("Coming Soon")}
                            style={{ width: "40%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: Constants.colors.GREEN_SUCCESS }}>
                                <Text style={{ fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE, fontWeight: "bold" }}>ISSUE DEBIT CARD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("AmountScreen")}
                            style={{ width: "40%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: Constants.colors.GREEN_SUCCESS }}>
                                <Text style={{ fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE, fontWeight: "bold" }}>WITHDRAW CASH</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 100, marginTop: 20 }}>
                        <TouchableOpacity 
                            onPress={() => alert("Coming Soon")}
                            style={{ width: "40%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: Constants.colors.GREEN_SUCCESS }}>
                                <Text style={{ fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE, fontWeight: "bold" }}>OTHER SERVICES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => alert("Coming Soon")} 
                            style={{ width: "40%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: Constants.colors.GREEN_SUCCESS }}>
                                <Text style={{ fontSize: Constants.fontSizes.REGULAR, color: Constants.colors.WHITE, fontWeight: "bold" }}>MINI STATEMENT</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>
        )
    }
}