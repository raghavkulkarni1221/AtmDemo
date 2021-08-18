import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';

export default class ScreenLoader extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            this.props.showLoader ? (
                <View style={styles.parent}>
                    <View style={{ width: "40%", height: 80, borderRadius: 5, backgroundColor: '#312f2fa8', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={"large"} color={"#fff"}></ActivityIndicator>
                    </View>
                </View>
            ) : null
        )
    }
}

const styles = StyleSheet.create({
    parent: { 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height, 
        backgroundColor: 'transparent', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute' 
    }
})
