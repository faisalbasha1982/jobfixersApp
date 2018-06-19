import { StackNavigator } from 'react-navigation';
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

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LanguageScreen: { screen: LanguageScreen },
  NewScreen: { screen: NewScreen },
  WelcomeScreen: { screen: WelcomeScreen },
  FormOne: { screen: FormOne },
  FormTwo: { screen: FormTwo },
  FormTwoNew: { screen: FormTwoNew},
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

export default PrimaryNav;
