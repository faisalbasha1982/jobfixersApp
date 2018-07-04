import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { BackHandler, Platform } from 'react-native'
// import SplashScreen from 'react-native-splash-screen';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  // componentDidMount()
  // {
  //   SplashScreen.hide();
  // }

  componentWillMount() {
    if (Platform.OS !== 'android') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props;
      console.log("Back pressed", nav);
      const activeRoute = nav.routes[nav.index];
      if (activeRoute.index === 0) {
        return false;
      }
      dispatch(NavigationActions.back());
      return true;
    })
}

componentWillUnmount() {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress')
}


  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
