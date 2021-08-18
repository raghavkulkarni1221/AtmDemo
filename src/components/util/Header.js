import React, { Component } from "react";
import { Constants } from "../../Constants";
import { View, Image, Text, TouchableOpacity } from 'react-native';

export default class Header extends Component {
    render() {
        const rightHeaderImage = this.props.rightHeaderImage || null;
        const hideBackButton = this.props.hideBackButton || false;
        return (
            <View style={{ width: '100%', backgroundColor: Constants.colors.PRIMARY, height: 60, flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                <Text style={{ fontWeight: "bold", fontSize: Constants.fontSizes.EXTRA_LARGE, color: Constants.colors.WHITE, width: "100%", textAlign: 'center' }}>{this.props.title}</Text>
                {!hideBackButton ? <TouchableOpacity
                    style={{ height: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 20 }}
                    onPress={() => this.props.onBackPressed()}>
                    <Image
                        resizeMode={"cover"}
                        style={{ width: 20, height: 15 }}
                        source={require("../../assets/back.png")}></Image>
                </TouchableOpacity> : null}

                {rightHeaderImage ? <TouchableOpacity
                    style={{ height: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20 }}
                    onPress={() => this.props.onRightImageClicked() ? this.props.onRightImageClicked() : null}>
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 18, height: 18 }}
                        source={rightHeaderImage}></Image>
                </TouchableOpacity> : null}
            </View>
        )
    }
}