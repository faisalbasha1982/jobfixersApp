import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  PixelRatio,
  Alert,
  Platform
} from 'react-native';
import PropTypes from "prop-types";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import logoHeader from '../Images/page1.png';
import pushImage from '../Images/pushForA.png';
import jobImage from '../Images/group2.png';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';


import { Colors } from "../Themes";
import { Images } from '../Themes';
import { Button } from 'react-native-elements';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

const animations = [
    ['bounce','#62B42C'],
    ['flash','#316BA7'],
    ['jello','#A0A0A0'],
    ['pulse','#FFC600'],
    ['rotate','#1A7984'],
    ['rubberBand','transparent'],
    ['shake','#FF6800'],
    ['swing','#B4354F'],
    ['tada','#333333']
];

const animationsNew = [
    ['bounce','transparent'],
    ['flash','transparent'],
    ['jello','transparent'],
    ['pulse','transparent'],
    ['rotate','transparent'],
    ['rubberBand','transparent'],
    ['shake','transparent'],
    ['swing','transparent'],
    ['tada','transparent']
];

// Styles

class PushForJob extends Component {

    stopAnimation = () => {
        this.refs
    }

    renderAnimation = (start) => {

        var selected_animations = animationsNew.slice(start,start+1);
        return selected_animations.map((animation,index)=>
                {
                    return (                        
                            <TouchableOpacity onPress={() => { 
                                this.stopAnimation(animation[0]);
                                this.props.onButtonPress()}}>
                                <Animatable.View
                                    ref={animation[6]}
                                    style={[newStyle.box,{backgroundColor: animation[6]}]}
                                    animation = {animation[6]}
                                    iterationCount={"infinite"}>
                                    <Image source={jobImage} resizeMode="contain" style={{ width: viewPortWidth * 0.891, height: viewPortHeight * 0.891 }} />
                                </Animatable.View>
                            </TouchableOpacity>                             
                    );
                });
    }

    render()
    {
        var start = 6;
        var selected_animations = animationsNew.slice(start,start+1);

        return(
                <View style={newStyle.container}>
                    <View style={newStyle.topContainer}>
                        {/* <Text style={newStyle.pushStyle}>PUSH {'\n'} FOR {'\n'} A</Text>  */}
                        <Image source={pushImage} resizeMode="contain" style={{ width: viewPortWidth * 0.812, height: viewPortHeight * 0.35 }} />
                    </View>
                    <View style={newStyle.bottomContainer}>                        
                        {this.renderAnimation(6)}                        
                    </View>
                    <View style={newStyle.logoBottom}>
                            <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.350, height: viewPortHeight * 0.04 }} />
                    </View>
                </View>                
        );
    }

}

const newStyle = StyleSheet.create({

    container: {
                flex: 1,
                backgroundColor: '#fad704',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 45
    },

    topContainer: {
                flex:5,   
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 35,
    },

    logoBottom: {
                flex:1,                
                alignItems: 'center',
                justifyContent: 'center',
                width:99.7,
                height: 20,        
    },

    bottomContainer: {
                flex:10,
                width: viewPortWidth,
                height: viewPortHeight * 0.85,                
                alignItems: 'center',
                justifyContent: 'center',
    },

    button: {
                backgroundColor: 'red',
                flex:1,                
                borderColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                width:viewPortWidth,
                height: viewPortHeight * 0.85,        
    },

    box: {
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                height: viewPortHeight * 0.85,
                width: viewPortWidth,
                backgroundColor: '#fff'                
    },

    jobText: {
        width:155,
        height:114,
        fontFamily: 'barlowsemicondensed-extrabold',
        fontSize: 95,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#fad704",
        textShadowColor: "#07438f",
        textShadowOffset: {
            width: 3,
            height: 5
        },
        textShadowRadius: 0
    },

    pushStyle: {
                width: 130,
                height: 237,
                fontFamily: 'barlowsemicondensed-extrabold',
                fontSize: 60,
                fontStyle: "normal",
                fontWeight: "800",
                lineHeight: 75,
                letterSpacing: 0,
                textAlign: "center",
                color: "#e73d50",
                textShadowColor:"#07438f",
                textShadowOffset: {
                    width: 3,
                    height: 5
                },
                textShadowRadius: 0           
    },

});

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      onButtonPress: () => dispatch(NavigationActions.navigate({routeName: 'NewScreen'})),
      navigateBack: () => dispatch(NavigationActions.back()),  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushForJob);