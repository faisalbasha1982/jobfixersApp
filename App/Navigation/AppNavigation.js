import { createStackNavigator,NavigationActions } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import React from 'react';

import LaunchScreen from '../Containers/LaunchScreen';
import LanguageScreen from '../Containers/LanguageScreen';
import NewScreen from '../Containers/NewScreen';
import WelcomeScreen from '../Containers/WelcomeScreen';
import FormOne from '../Containers/FormOne';
import FormTwo from '../Containers/FormTwo';
import FormTwoNew from '../Containers/FormTwoNew';
import ThankYouScreen from '../Containers/ThankYouScreen';
import PushForJob from '../Containers/PushForJob';
import styles from './Styles/NavigationStyles';
import LanguageButton from '../Components/LanguageButton';


// const middleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.nav
// );

// Manifest of possible screens
const AppNavigation = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LanguageButton: { screen: LanguageButton},
  LanguageScreen: { screen: LanguageScreen },
  NewScreen: { screen: NewScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
   },
  WelcomeScreen: { screen: WelcomeScreen },
  FormOne: { screen: FormOne,
    navigationOptions: {
      gesturesEnabled: false,
    }, 
  },
  FormTwo: { screen: FormTwo,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  FormTwoNew: { screen: FormTwoNew,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  ThankYouScreen : { screen: ThankYouScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
   },
  PushForJob: { screen: PushForJob},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PushForJob',
  mode: "card",
  navigationOptions: {
    headerStyle: styles.header
  }
})

// const AppWithNavigationState = reduxifyNavigator(PrimaryNav, 'root');
// const mapStateToProps = state => ({
//   state: state.nav,
// })
// const AppNavigation = connect(mapStateToProps)(AppWithNavigationState);

// export default { PrimaryNav, AppNavigation, middleware };

export default AppNavigation;

