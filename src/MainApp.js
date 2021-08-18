import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Alert,
    SafeAreaView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Constants } from './Constants';
import { updateConnectionStatus } from './actions/connection';
import AppNavigator from './navigation/AppNavigator';
import { bindActionCreators } from 'redux';
import ScreenLoader from './components/util/ScreenLoader';
import NetInfo from "@react-native-community/netinfo";
import { EventRegister } from 'react-native-event-listeners';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showLoader: false,
            showNoConnectionScreen: false,
            connectAlertActive: false
        }
    }

    async componentDidMount() {
        NetInfo.addEventListener(this._handleConnectivityChange);

        this.listener = EventRegister.addEventListener('screenLoader', (data) => {
            this.setState({
                showLoader: data.show
            })
        })
        this.listener = EventRegister.addEventListener('connectionLost', (data) => {
            this.setState({
                showNoConnectionScreen: data.show
            });
        })
    }

    _handleConnectivityChange = (state) => {
        this.props.updateConnectionStatus(state.isConnected);
        if (state.isConnected) {
            this.setState({
                showNoConnectionScreen: false
            })
        }
    };

    componentWillUnMount() {
        EventRegister.removeEventListener(this.listener);
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <AppNavigator />
                </SafeAreaView>

                <ScreenLoader
                    showLoader={this.state.showLoader}></ScreenLoader>
                {this.state.showNoConnectionScreen && !this.state.connectAlertActive ?
                    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: '#04040494', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                        {this.showConnectionAlert()}
                    </View> : null}
            </SafeAreaProvider>
        );
    }

    showConnectionAlert = () => {
        this.setState({
            connectAlertActive: true
        }, () => {
            Alert.alert(
                "Connection Lost",
                "Internet connectivity has been lost. Please re-establish connection to continue.",
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => {
                            EventRegister.emit('connectionLost', { show: false });
                            this.setState({
                                connectAlertActive: false
                            })
                        }
                    }
                ],
                {
                    cancelable: true
                }
            );
        });
    }
}

const mapStateToProps = state => ({
    connectionStatus: state.connection.connectionStatus
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateConnectionStatus
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
