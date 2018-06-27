import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import WelcomeScreen from '../Containers/WelcomeScreen';
import { NavigationActions, createStackNavigator } from "react-navigation";
import { connect } from 'react-redux';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

class LanguageButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageText: undefined,
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log("nextProps.language="+nextProps.language)
    if (nextProps.language !== this.props.language) {
      this.setState({
        languageText: nextProps.language,
      })
    }
  }

  componentDidMount()
  {
    console.log("languagebutton component called with received props="+this.props.language);
    this.setLanguage();
    console.log("set languageText="+this.state.languageText);
  }

  setLanguage = () => {
      console.log("going to set Language");
      this.setState({languageText: this.props.language },()=> console.log("changes to customer state"));
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.languageText != this.state.languageText;
 }

  // width: (viewPortWidth * 41) / 46,
  // height: viewPortHeight / 11,

  buttonPress = (lang) => {
    this.props.navigation.navigate("FormOne",{language: lang,navigation: this.props.navigation});  
  }

  render() {
    console.log("this.props.language="+this.props.language);
    const { navigate } = this.props.navigation;
    return (
      <Button
        onPress={() => this.buttonPress(this.props.language)}
        activeOpacity={0.5}
        style={{
          height: "25.5%",
          width: "92.1%",
          marginBottom: 17,
          marginLeft: 15,
          backgroundColor: '#E73D50',
          borderRadius: 8,
          marginTop: viewPortHeight / 80,
        }}
      >
        {this.props.language !== "NEDERLANDS" ?
          <Text
            style={{
              fontSize: 16,
              width: 375,
              height: 19,
              fontFamily: 'WorkSans-Medium',
              fontWeight: '500',
              fontStyle: 'normal',
              color: '#ffffff',
              letterSpacing: 0,
              marginLeft: 110,
              textAlign: 'left'
            }}
          > {this.props.language}
          </Text> :
          <Text
            style={{
              fontSize: 16,
              width: 375,
              height: 19,
              fontFamily: 'WorkSans-Medium',
              fontWeight: '500',
              fontStyle: 'normal',
              color: '#ffffff',
              letterSpacing: 0,
              marginLeft: 95,
              textAlign: 'left'
            }}
          > {this.props.language}
          </Text>}
      </Button>
    );
  }
}

LanguageButton.propTypes = {
  language: PropTypes.string.isRequired
}

// const mapStateToProps = state => {
//   return {
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {

//     resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
//     navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
//     // onButtonPress: (language) => dispatch(NavigationActions.navigate({routeName: 'FormOne',params: {language: language }})),
//     // navigateBack: () => dispatch(NavigationActions.back()),
//     // onButtonPress: (language) => this.props.navigation.navigate('FormOne',{language: language,}),
//     // navigateBack: () => this.props.navigation.goBack(),

//   };
// };

export default LanguageButton;