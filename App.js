import React, { Component } from 'react';
import { LogBox, Alert } from 'react-native';
import { Provider } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
import { store } from './src/configureStore';
import MainApp from './src/MainApp';
import SplashImage from './src/components/SplashScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isLoading: true
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    
    setTimeout(async() => {
      this.setState({
        isLoading: false
      });
    }, 2000);
    // SplashScreen.hide();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <SplashImage />
      );
    }
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}

export default App;