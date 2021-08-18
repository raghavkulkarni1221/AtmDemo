import React, { Component } from "react";
import { View, Text, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import { Constants } from '../../Constants';

export class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
    };

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const { placeholder, ...props } = this.props;
        const { isFocused } = this.state;
        const customStyle = this.props.style || {};
        const showRightImage = this.props.showRightImage || false;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            paddingLeft: this.props.multiline ? 5 : 0,
            paddingRight: this.props.multiline ? 5 : 0,
            top: !isFocused && !this.props.value ? 24 : 0,
            fontSize: !isFocused && !this.props.value ? 14 : 12,
            fontWeight: "300",
            color: Constants.colors.SECONDARY_GREY
        };
        const textStyle = this.props.textStyle || { width: this.props.showValid ? "90%" : '100%', height: this.props.multiline ? this.props.multilineHeight ? this.props.multilineHeight : 50 : Platform.OS == 'android' ? !isFocused && !this.props.value ? 26 : 40 : 26, fontWeight: "500", fontSize: Constants.fontSizes.LARGE, color: Constants.colors.SECONDARY_GREY }
        return (
            <View style={[{ paddingTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: this.props.multiline ? 0.3 : 0, borderBottomWidth: isFocused ? 2 : 0.5, borderBottomColor: isFocused ? Constants.colors.PRIMARY : "#d8d8d8", padding: this.props.multiline ? 5 : 0  }, customStyle]}>
                <Text style={labelStyle}>
                    {placeholder}
                </Text>
                <TextInput
                    autoCapitalize={"none"}
                    keyboardType={this.props.keyboardType || 'default'}
                    secureTextEntry={this.props.password ? true : false}
                    {...props}
                    multiline={this.props.multiline || false}
                    value={this.props.value}
                    style={textStyle}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {this.props.showValid && this.props.value && this.props.value.length > 0 ? 
                <Image
                    style={{ width: 20, height: 20 }}
                    source={this.props.isValid ? require("../../assets/checkCircle.png") : require("../../assets/alertCircle.png")}></Image> : null}

                {showRightImage ?
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 5 }}
                        onPress={() => this.props.onRightImageClicked()}>
                        <Image
                            source={this.props.rightImageSource}
                            style={{ width: 20, height: 20 }}>
                        </Image>
                    </TouchableOpacity>
                : null}
            </View>
        );
    }
}