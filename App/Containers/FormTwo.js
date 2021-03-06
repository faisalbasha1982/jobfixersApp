import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    PixelRatio,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
    Picker,
    Platform,
    Linking,
    PickerIOS,
    Animated,
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import  axios  from 'axios';
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 
import DeviceInfo from 'react-native-device-info'
import { StyleSheet } from 'react-native';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker, { getAllCountries} from 'react-native-country-picker-modal';
import CryptoJS from 'crypto-js';
import Api from './Api';
import DropdownMenu from './DropDownMenu';
import Validation from '../Components/ButtonValidation';
import SimplePicker from 'react-native-simple-picker';
import Modal from "react-native-modal";
import SmartPicker from 'react-native-smart-picker';
import IOSPicker from 'react-native-ios-picker';
import RNPickerSelect from 'react-native-picker-select';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';
import languageSettings from '../Containers/LanguageSettingsNew';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

let userLocaleCountryCode = DeviceInfo.getDeviceCountry();

let NORTH_AMERICA = ['CA', 'MX', 'US', "BE","AO","AD","US","AE"];

const userCountryData = getAllCountries()
      .filter(country => NORTH_AMERICA.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();

let callingCode = null;
let cca2 = userLocaleCountryCode;
var PickerItemIOS = PickerIOS.Item;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Styles

class FormTwo extends Component {

    constructor(props)
    {
        super(props);        

        if (!cca2 || !userCountryData) {
            cca2 = 'US'
            callingCode = '1'
          } 
          else {
            callingCode = userCountryData.callingCode
          }
        
        this.state = {
            language: 'NEDERLANDS',
            workText: '',
            postalCode: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            dropDownItem: '',            
            postalCodeInput: '',
            postalCodeError: false,
            postalCodeEmptyError:false,
            EmptyErrorText:'',
            checkBoxError:false,
            policyText: '',
            policyTextColor: '#000',
            buttonText: '',
            checked: false,
            cca2:'',
            callingCode:'',
            country:'',
            isLoading:false,
            message: '',
            time: '',
            selected:'',
            eAuthData:'',
            buttonClicked: false,
            renderValidate:false,
            construct:'',
            office:'',
            industry:'',
            isModalVisible: false,
            pickerSelected: false,
            modal: false,
            offSet: new Animated.Value(viewPortHeight),
            currentDataIndex:0,
            favColor:'',
            // items: [
            //     {
            //         label: this.state.construct,
            //         value: this.state.construct,
            //     },
            //     {
            //         label: this.state.industry,
            //         value: this.state.industry,
            //     },
            //     {
            //         label: this.state.office,
            //         value: this.state.office,
            //     },
            // ],

            items: [
                {
                    label: 'Red',
                    value: 'red',
                },
                {
                    label: 'Orange',
                    value: 'orange',
                },
                {
                    label: 'Blue',
                    value: 'blue',
                },
            ],
    
            // data: [
            //     {
            //       value: 'Construction Worker',
            //     },
            //     {
            //       value: 'Worker',
            //     },
            //     {
            //       value: 'Clerk',
            //     }
            //   ],
        };
    
    }

    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
      }
    
    toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    componentWillReceiveProps(nextProps) {
        if (this.props.navigation.state.params.objectParams !== nextProps.objectParams) {
            this.setState({ 
                language: this.props.navigation.state.params.objectParams.language,
                firstname: this.props.navigation.state.params.objectParams.firstName,
                lastname: this.props.navigation.state.params.objectParams.lastName,
                phonenumber: this.props.navigation.state.params.objectParams.phoneNumber,                
            });
            this.setText();
        }
    }

    componentDidMount() {
        console.log("default language="+this.props.navigation.state.params.objectParams.language);
        this.setState({ 
            language: this.props.navigation.state.params.objectParams.language,
            firstname: this.props.navigation.state.params.objectParams.firstName,
            lastname: this.props.navigation.state.params.objectParams.lastName,
            phonenumber: this.props.navigation.state.params.objectParams.phoneNumber,                
        });
        console.log("language="+this.state.language);
        this.setText();
        console.log("this.state.firstName="+this.state.firstName);
        console.log("this.state.buttonText="+this.state.buttonText);
    }

    setText = () => {

        console.log("this.state.language="+this.state.language);

        if (this.props.navigation.state.params.objectParams.language === 'NEDERLANDS') {
            console.log("setting in Nederlands");
            this.setState({
                workText:  LanguageSettings.dutch.workText,
                postalCode: LanguageSettings.dutch.postalCodeText,
                policyText: LanguageSettings.dutch.policyText,
                buttonText: LanguageSettings.dutch.buttonTextJob,
                industry: LanguageSettings.dutch.industry,
                construct: LanguageSettings.dutch.construct,
                office: LanguageSettings.dutch.office,
            });
        }
        else
            if (this.props.navigation.state.params.objectParams.language === 'ENGLISH') {
                console.log("setting in English");
                this.setState({
                    workText:  LanguageSettings.english.workText,
                    postalCode: LanguageSettings.english.postalCodeText,
                    policyText: LanguageSettings.english.policyText,
                    buttonText: LanguageSettings.english.buttonTextJob,
                    industry: LanguageSettings.english.industry,
                    construct: LanguageSettings.english.construct,
                    office: LanguageSettings.english.office,    
                    });
            }
            else
              {
                console.log("setting in French");
                this.setState({
                    workText:  LanguageSettings.french.workText,
                    postalCode: LanguageSettings.french.postalCodeText,
                    policyText: LanguageSettings.french.policyText,
                    buttonText: LanguageSettings.french.buttonTextJob,
                    industry: LanguageSettings.french.industry,
                    construct: LanguageSettings.french.construct,
                    office: LanguageSettings.french.office,    
                    });
            }       
    }

    randomStringIV = () => {

        let c = Math.random()*62;
        let rString = chars.substr(c,1);
     
          for(i=0;i<15;i++)
             rString = rString + chars.substr(Math.random()*62,1);
     
       return rString;
     }
     
     aes  = (authenticationData) => {
     
       const ivRandom = this.randomStringIV();
     
       // var key = CryptoJS.enc.Utf8.parse('VyhoMoGxi25xn/Tc');
       var key = CryptoJS.enc.Utf8.parse(Api.securityKey);
       var iv = CryptoJS.enc.Utf8.parse(ivRandom.toString());
       const ivFirstPart = ivRandom.substr(0,8);
       const ivLastPart = ivRandom.substring(8);
       console.log('first part='+ivFirstPart+ " Last part="+ivLastPart);
     
       var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(authenticationData), key,
           {
               keySize: 256 / 8,
               iv: iv,
               mode: CryptoJS.mode.CBC,
               padding: CryptoJS.pad.Pkcs7
           });
     
       var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
           keySize: 256 / 8,
           iv: iv,
           mode: CryptoJS.mode.CBC,
           padding: CryptoJS.pad.Pkcs7
       });
     
       console.log('Encrypted :' + encrypted);
       console.log('Key :' + encrypted.key);
       console.log('Salt :' + encrypted.salt);
       console.log('iv :' + encrypted.iv);
       console.log('Decrypted : ' + decrypted);
       console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
     
       return ivFirstPart + encrypted.toString() + ivLastPart;
    }
    
    login = async () => 
    {        
        // <View style={{ flex:1, flexDirection: 'row',
        // justifyContent: 'space-around',
        //     padding: 10 }}>
        //         <ActivityIndicator size="large" color="#0000ff" />
        // </View>        


        let phone = this.state.phonenumber;
        let fName = this.state.firstname;
        let lName = this.state.lastname;
        let postalCode = this.state.postalCodeInput;
        let Nieche = '';

        if(this.state.dropDownItem === 'Construction Worker' 
            || this.state.dropDownItem === 'Bouwvakker'
            || this.state.dropDownItem === 'Travailleur de construction')
            Nieche = 'Construct';

        if(this.state.dropDownItem === 'Worker'
            || this.state.dropDownItem === 'Arbeider'
            || this.state.dropDownItem === 'Travailleur')
            Nieche = 'Industry';

        if(this.state.dropDownItem === 'Clerk'
            || this.state.dropDownItem === 'Bediende'
            || this.state.dropDownItem === 'Employé')
            Nieche = 'Office';            

        console.log("values found in login, phone = "+this.state.phonenumber);
        console.log("values found in login, fName = "+this.state.firstname);
        console.log("values found in login, lName = "+this.state.lastname);
        console.log("values found in this.state.checked="+this.state.checked);
        console.log("values found in login, postalcode = "+this.state.postalCodeInput);

        if(phone === '' || fName === '' || postalCode ==='' || this.state.checked === false )
            {
                if(postalCode === '')
                {   
                    if(this.state.language === 'NEDERLANDS')
                        this.setState({ postalCodeError: true,  ErrorText: LanguageSettings.dutch.postalCodeErrorText });
                    else
                        if(this.state.language === 'ENGLISH')
                            this.setState({ postalCodeError: true,  ErrorText: LanguageSettings.english.postalCodeErrorText });
                        else
                            this.setState({ postalCodeError: true,  ErrorText: LanguageSettings.french.postalCodeErrorText });
                }

                 if(this.state.checked === false)
                 {

                    if(this.state.language === 'NEDERLANDS')
                        {
                            this.setState({ checkBoxError: true, ErrorText: LanguageSettings.dutch.CheckBoxErrorText});
                        }
                        // errorString = errorString + LanguageSettings.dutch.CheckBoxErrorText;
                    else
                        if(this.state.language === 'ENGLISH')
                            this.setState({ checkBoxError: true, ErrorText: LanguageSettings.english.CheckBoxErrorText});

                            // errorString = errorString + LanguageSettings.english.CheckBoxErrorText;
                        else
                            this.setState({ checkBoxError: true, ErrorText: LanguageSettings.french.CheckBoxErrorText});
                            // errorString = errorString + LanguageSettings.french.CheckBoxErrorText;
                    
                 }
                    //this.setState({ checkBoxError: true, ErrorText: 'Check Box is Required!'});

            }
        else
           {
            this.setState({isLoading: true});

            //   let names = this.state.fullName.split(' ').toString();
              // Alert.alert('Names:', names);
              // Alert.alert('Nieche:', this.state.selected );
              let cAuthenticationData = "{'Lang':"+" '"+this.state.language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";
              console.log("AuthenticationData:",cAuthenticationData);
    
            //   Alert.alert('Authentication Data:', cAuthenticationData);
              //"AuthenticationData": "{'Lang': 'fr',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-04-30 11:30:12' ,'R' : 'er3rss'}",
    
              var encrypted = this.aes(cAuthenticationData);
              console.log('loginfunction Encrypted :' + encrypted);

            Platform.OS === 'ios'?
    
              fetch(Api.signUpURLP, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({      
                    AuthenticationData: encrypted.toString(),
                    firstname: fName,
                    lastname: lName,
                    phonenumber: this.state.phonenumber,
                    postalcode: parseInt(this.state.postalCodeInput),
                    niche: Nieche,
                }),
              }).then(response => response.json())
                .then((res) => {
                  console.log('Success:', res);
                  if (typeof (res.message) !== 'undefined') {
                    this.setState({ message: res.Message_en });
                    // Alert.alert('Welcome', this.state.message);
                    this.setState({ isLogin: false, canLogin: false });
                    this.props.navigation.navigate('ThankYouScreen',{language: this.state.language,navigation: this.props.navigation});
                    //this.props.clear();
                  } else {
                    console.log("message=",res.Message_en);
                    this.setState({ message: res.Message_en })
                    // Alert.alert('Welcome', this.state.message);
                    this.props.navigation.navigate('ThankYouScreen',{language: this.state.language});
                  }
                }).catch((error) => { console.error(error); })
                :
                data = JSON.stringify({
                    "AuthenticationData": encrypted.toString(),
                    "firstname": fName,
                    "lastname": lName,
                    "phonenumber": this.state.phonenumber,
                    "postalcode": parseInt(this.state.postalCodeInput),
                    "niche": Nieche
                  });
                  
                  var xhr = new XMLHttpRequest();
                  xhr.withCredentials = true;
                  
                  xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4 && xhr.status === 200) {
                      console.log(this.responseText);
                    }
                    else
                    {
                        console.log("error message="+xhr.status);
                    }
                  });
                  
                  xhr.open("POST", "https://prod-54.westeurope.logic.azure.com:443/workflows/fad35cb3bf804958806170aab090f5fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PIqV4C0NMg6yGjaBeaOMl8oLM8DK8v8NilOL-4azW7A");
                  xhr.setRequestHeader("Accept", "application/json");
                  xhr.setRequestHeader("Content-Type", "application/json");
                  xhr.setRequestHeader("Cache-Control", "no-cache");
                  xhr.setRequestHeader("Postman-Token", "366882d7-ecb6-4c7b-b0aa-2e7e7314dc79");

                // fetch(Api.signUpURLP, {
                //     method: 'POST',
                //     headers: {
                //       'Content-Type':'application/json',
                //       Accept:'application/json',
                //       'Cache-Control': 'no-cache',
                //     },
                //     body:JSON.stringify({      
                //         AuthenticationData: encrypted.toString(),
                //         firstname: fName,
                //         lastname: lName,
                //         phonenumber: this.state.phonenumber,
                //         postalcode: parseInt(this.state.postalCodeInput),
                //         niche: Nieche,
                //     }),
                //   }).then(response => response.json())
                //     .then((res) => {
                //       console.log('Success:', res);
                //       if (typeof (res.message) !== 'undefined') {
                //         this.setState({ message: res.Message_en });
                //         // Alert.alert('Welcome', this.state.message);
                //         this.setState({ isLogin: false, canLogin: false });
                //         this.props.navigation.navigate('ThankYouScreen',{language: this.state.language,navigation: this.props.navigation});
                //         //this.props.clear();
                //       } else {
                //         console.log("message=",res.Message_en);
                //         this.setState({ message: res.Message_en })
                //         // Alert.alert('Welcome', this.state.message);
                //         this.props.navigation.navigate('ThankYouScreen',{language: this.state.language});
                //       }
                //     }).catch((error) => { console.error(error); })
                // axios.post(Api.signUpURLP,{
                //     AuthenticationData: encrypted.toString(),
                //     firstname: fName,
                //     lastname: lName,
                //     phonenumber: this.state.phonenumber,
                //     postalcode: parseInt(this.state.postalCodeInput),
                //     niche: Nieche,
                // },
                // {
                //     headers: {
                //         Accept: "application/json",
                //         "Content-Type":"application/json",
                //     },
                //     method: 'POST'
                // })
                // .then( response => response.json())
                // .then((res) => console.log(res))
                // .catch((error) => { console.error(error)});
                               
                // xhr = new XMLHttpRequest();
                // var url = Api.signUpURLP;
                // xhr.onreadystatechange =  () =>  { 
                //     if (xhr.readyState === 4 && xhr.status === 200) 
                //     {
                //         var json = JSON.parse(xhr.responseText);
                //         console.log(json);
                //     }

                //     if(xhr.readyState !== 4)
                //         return;
                // }
                // var data = JSON.stringify({      
                //     "AuthenticationData": encrypted.toString(),
                //     "firstname": fName,
                //     "lastname": lName,
                //     "phonenumber": this.state.phonenumber,
                //     "postalcode": parseInt(this.state.postalCodeInput),
                //     "niche": Nieche,
                // });
                // xhr.open("POST", url, true);
                // xhr.setRequestHeader("Content-type", "application/json");
                // xhr.send(data);              
            }
    }

    toggleChecked = () => {

            
    }

    validationPostalCode = (pcode) => {
        let reg = /^[0-9]{4}$/;

        if(pcode==='')
        {
            //this.setState({ postalCodeError: true, ErrorText: 'Postal Code is Required!' });

            if(this.state.language === 'NEDERLANDS')
                this.setState({ postalCodeEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ postalCodeEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ postalCodeEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });

        }
        else
        {
            if (reg.exec(pcode))
                this.setState({ postalCodeEmptyError:false, EmptyErrorText: '', postalCodeError: false, postalCodeInput: pcode });
            else
            {
                if(this.state.language === 'NEDERLANDS')
                    this.setState({ postalCodeEmptyError:false, EmptyErrorText: '', postalCodeError: true,  ErrorText: LanguageSettings.dutch.postalCodeErrorText });
                else
                    if(this.state.language === 'ENGLISH')
                        this.setState({ postalCodeEmptyError:false, EmptyErrorText: '', postalCodeError: true,  ErrorText: LanguageSettings.english.postalCodeErrorText });
                    else
                        this.setState({ postalCodeEmptyError:false, EmptyErrorText: '', postalCodeError: true,  ErrorText: LanguageSettings.french.postalCodeErrorText });
            }
        }    
    }

    renderValidation = () => {
        
        let errorString = this.state.ErrorText + '\n';
        errorString = errorString + this.state.EmptyErrorText + '\n';        

        console.log("this.state.checked=="+this.state.checked);
        console.log("render validation language="+this.state.language);

        if(this.state.checked===false)
           {
               if(this.state.language === 'NEDERLANDS')
                    errorString = errorString + LanguageSettings.dutch.CheckBoxErrorText;
                else
                    if(this.state.language === 'ENGLISH')
                        errorString = errorString + LanguageSettings.english.CheckBoxErrorText;
                    else
                        errorString = errorString + LanguageSettings.french.CheckBoxErrorText;                   
           }          

        if(this.state.postalCodeError === true || this.state.checkBoxError === true)
            return (
                <View style={newStyle.validationStyle}> 
                        <Validation
                            objectParams = 
                            {{
                                'btnText': this.state.ErrorText, 
                                'language': this.props.navigation.state.params.language,
                                'backgroundColor':'normal'
                            }}
                        />
                </View>
            );
        else
          if(this.state.checked===false && this.state.checkBoxError !== false)
        return (
            <View style={newStyle.validationStyle}> 
                    <Validation
                        objectParams = 
                        {{
                            'btnText':  errorString, 
                            'language': this.props.navigation.state.params.language,
                            'backgroundColor':'normal'
                        }}
                    />
            </View>
        );
        else
          if(this.state.checked===true)
           return(
            <View style={newStyle.validationStyle}> 
                    <Validation
                        objectParams = 
                        {{
                            'btnText':  '', 
                            'language': this.props.navigation.state.params.language,
                            'backgroundColor':'transparent'
                        }}
                    />
            </View>
               
           );
        return;

    }
    
    getUTCDate = () => {
      //2018-04-30 11:30:12
  
      var date, day, month, year;
      var today = new Date();
  
      day = parseInt(today.getUTCDate())>10?today.getUTCDate():('0'+today.getUTCDate().toString());
      month = parseInt(today.getUTCMonth()+1)>10?parseInt(today.getUTCMonth()+1):('0'+parseInt(today.getUTCMonth()+1));
      year = today.getUTCFullYear().toString();
  
      // let currentDate = year + '-' + month>10?month:('0'+month) + '-' + day>10?day:('0'+day);
      let currentDate = year + '-'+month+'-'+ day;
  
      // Creating variables to hold time.
      var date, TimeType, hour, minutes, seconds, fullTime;
      
      // Getting current hour from Date object.
      hour = today.getUTCHours(); 
  
      if(hour < 10)
        hour = '0' + today.getUTCHours();
  
      // Getting the current minutes from date object.
      minutes = today.getUTCMinutes();
   
      // // Checking if the minutes value is less then 10 then add 0 before minutes.
      if(minutes < 10)
        minutes = '0' + minutes.toString();
   
      //Getting current seconds from date object.
      seconds = today.getUTCSeconds();
   
      // // If seconds value is less than 10 then add 0 before seconds.
      if(seconds < 10)
        seconds = '0' + seconds.toString();
   
      // Adding all the variables in fullTime variable.
      fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
  
      //var utcDate = new Date(Date.UTC(year,month-1,day,hour,minutes,seconds));
     
    //   Alert.alert('Day & Time UTC', currentDate+' '+fullTime);
  
      return currentDate+' '+fullTime;
    }
  
    getTimeData = () => {
      //2018-04-30 11:30:12
  
      var date, day, month, year;
      var today = new Date();
  
      day = parseInt(today.getDate())>10?today.getDate():('0'+today.getDate().toString());
      month = parseInt(today.getMonth()+1)>10?parseInt(today.getMonth()+1):('0'+parseInt(today.getMonth()+1));
      year = today.getFullYear().toString();
  
      // let currentDate = year + '-' + month>10?month:('0'+month) + '-' + day>10?day:('0'+day);
      let currentDate = year + '-'+month+'-'+ day;
  
      // Creating variables to hold time.
      var date, TimeType, hour, minutes, seconds, fullTime;
      
      // Getting current hour from Date object.
      hour = today.getHours(); 
  
      if(hour < 10)
        hour = '0' + today.getHours();
  
      // Getting the current minutes from date object.
      minutes = today.getMinutes();
   
      // // Checking if the minutes value is less then 10 then add 0 before minutes.
      if(minutes < 10)
        minutes = '0' + minutes.toString();
   
      //Getting current seconds from date object.
      seconds = today.getSeconds();
   
      // // If seconds value is less than 10 then add 0 before seconds.
      if(seconds < 10)
        seconds = '0' + seconds.toString();
   
      // Adding all the variables in fullTime variable.
      fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
  
      //var utcDate = new Date(Date.UTC(year,month-1,day,hour,minutes,seconds));
     
      Alert.alert('Day & Time', currentDate+' '+fullTime);
  
      return currentDate+' '+fullTime;
    }

    onChangeTextPress = (value) => {
        this.setState({ selected: value});
     }
   
     
    somethingElse = () => {

    }
    

    callLogin = async () =>
    {
        this.login();
        //this.props.onButtonPress(this.state.language);
    }

    pickerComponent = () => {
        // console.log("hello in picker Component");
        return (
            <Picker
            selectedValue={this.state.dropDownItem}
            style={{                                          
            backgroundColor: '#f6f6f6',
            fontFamily: 'WorkSans-Bold',
            fontWeight: '400',
            padding: 10,                                        
        }}
            onValueChange={(itemValue, itemIndex) => this.setState({dropDownItem: itemValue})}>
            <Picker.Item label={this.state.construct} value={this.state.construct} />
            <Picker.Item label={this.state.industry} value={this.state.industry} />
            <Picker.Item label={this.state.office} value={this.state.office} />
        </Picker>       
        );
    }

    change(d, data) {
        this.setState({selectedValue: data});
      }
    
    render() {
        const myIcon = (<Icon name="angle-left" size={30} color="#900" />);
        var bt = LanguageSettings.dutch.buttonTextJob;
        const lbl = '';
        var data = [this.state.construct, this.state.industry, this.state.office];
        var newData = [
                    {
                        label: this.state.construct,
                        value: this.state.construct,
                    },
                    {
                        label: this.state.industry,
                        value: this.state.industry,
                    },
                    {
                        label: this.state.office,
                        value: this.state.office,
                    },
        ];

        return (

            Platform.OS === 'ios'?
            <KeyboardAwareScrollView
                        behavior="padding"
                        enableOnAndroid={false}
                        contentContainerStyle={newStyle.container}
                        scrollEnabled={true}
                        scrollToEnd={true}
                        enableResetScrollToCoords={true}
                        enableAutomaticScroll={true}>
           <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: (viewPortWidth), height: (viewPortHeight * .45) }} />
                    {
                           (this.state.checkBoxError===true || this.state.postalCodeError===true)?this.renderValidation():this.somethingElse()
                    }
                </View>
                {/* <Text style={newStyle.postalName}>{this.state.postalCode}</Text> */}
                {
                        this.state.isLoading===true?
                        <View style = {{position: 'absolute' , zIndex:3999, left: 20, top: 40, right: 0, bottom: 0}}>
                        <BallIndicator color='#e73d50' />
                        </View>:this.somethingElse()
                }
                    <TextInput
                            style={[newStyle.nameInput,{marginTop: 30},]}
                            keyboardType="numeric"
                            placeholder=''
                            underlineColorAndroid= 'transparent'
                            value={this.state.postalCodeInput}
                            onChangeText= { (postalCodeInput) => this.validationPostalCode(postalCodeInput) } />
                <View style={newStyle.inputContainer}>

                    <Text style={newStyle.firstName}>{this.state.workText}</Text>
                    <View style= {newStyle.dropDownStyle}>

                        {/* { */}
                         {/* //Platform.OS==='ios'?
                        //  <DropdownMenu
                        //         style={{
                        //         flex: 1, 
                        //         marginTop: 20,
                        //         flexDirection: 'row', 
                        //         borderRadius: 8, 
                        //         }}
                        //         bgColor={'transparent'}
                        //         tintColor={'#666666'}
                        //         activityTintColor={'green'}
                        //         // arrowImg={}      
                        //         // checkImage={}   
                        //         // optionTextStyle={{color: '#333333'}}
                        //         // titleStyle={{color: '#333333'}} 
                        //         maxHeight={250} 
                        //         handler={(selection, row) => this.setState({dropDownItem: data[selection][row]})}
                        //         data={data}> 
                        // </DropdownMenu>                        
                       
                        //: */}
                       <View style={{
                                width: Platform.OS==='ios'?350:250,
                                height: 57,
                                borderRadius: 8,
                                backgroundColor: '#f6f6f6',
                                padding: 10,
                                paddingTop: 20,
                                fontFamily: 'WorkSans-Bold',
                                fontWeight: '400',
                                paddingLeft: 0,}}>
                                 {Platform.OS === 'ios'?
                                 <RNPickerSelect
                                        items={newData}
                                        placeholder={{}}
                                        hideIcon={true}
                                        style={{ padding:10,marginTop: 10,
                                            fontFamily: 'WorkSans-Bold',
                                            fontWeight: '500',
                                         }}
                                        onValueChange={(value) => 
                                        {
                                            this.setState({
                                                favColor: value,
                                            });
                                        }}>
                                </RNPickerSelect>
                                :
                                <Picker
                                        selectedValue={this.state.dropDownItem}
                                        style={{                                          
                                        backgroundColor: '#f6f6f6',
                                        fontFamily: 'WorkSans-Bold',
                                        fontWeight: '400',
                                        padding: 10,        
                                    }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({dropDownItem: itemValue})}>
                                        <Picker.Item label={this.state.construct} value={this.state.construct} />
                                        <Picker.Item label={this.state.industry} value={this.state.industry} />
                                        <Picker.Item label={this.state.office} value={this.state.office} />
                                </Picker>
                                 
                                 }
                        </View>                     
                      {/* //} */}

                    </View>
                    
                    <Text style={newStyle.postalName}>{this.state.postalCode}</Text>
                    {/* <View style={{flex:1,}}>
                        <Text style={newStyle.postalName}>{this.state.postalCode}</Text>
                        <TextInput
                                keyboardType="numeric"
                                placeholder='postalcode here......'
                                underlineColorAndroid= 'transparent'                     
                                style={newStyle.nameInput}
                                onChangeText={(postalCodeInput) => this.validationPostalCode(postalCodeInput)}
                                value={this.state.postalCodeInput}/>
                    </View> */}

                    <View style={newStyle.policyStyle}> 
                    <CheckBox  
                                title=''                                  
                                checked={this.state.checked}
                                checkedColor='red'
                                containerStyle={newStyle.checkBoxStyle}
                                onPress={() => {
                                                   this.setState({checked: !this.state.checked});
                                            }
                                     }
                                />                                        
                                {
                                    this.props.navigation.state.params.objectParams.language ==='NEDERLANDS'?
                                    <Text style={{marginTop: 5, fontFamily: 'WorkSans-Bold', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 20}}>{LanguageSettings.dutch.agreementText} {'\n'}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => Linking.openURL('https://jobfixers.be/nl/privacy')}>{LanguageSettings.dutch.policyText}</Text></Text>
                                    :this.props.navigation.state.params.objectParams.language === 'ENGLISH'?
                                    <Text style={{marginTop: 5, fontFamily: 'WorkSans-Bold', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 20}}>{LanguageSettings.english.agreementText} {'\n'}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => Linking.openURL('https://jobfixers.be/nl/privacy')}>{LanguageSettings.english.policyText}</Text></Text>
                                    :
                                    <Text style={{marginTop: 15, fontFamily: 'WorkSans-Bold', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 16}}>{LanguageSettings.french.agreementText} {'\n'}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => Linking.openURL('https://jobfixers.be/nl/privacy')}>{LanguageSettings.french.policyText}</Text></Text>
                                }
                    
                    </View>

                </View>

                <View style={newStyle.buttons}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FormOne',{language: this.state.language,}) }
                        activeOpacity={0.5}
                        style={newStyle.iconStyle}>
                            <Icon
                                containerStyle={newStyle.iconImageStyle}                               
                                name='angle-left'
                                type='font-awesome'
                                color='#fff'
                                size = {40}
                                onPress={() => console.log('hello')} /> 
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => 
                    {
                        //if(this.state.checked===true && this.state.postalCodeError===false)
                                this.login();

                        //this.props.onButtonPress(this.state.language);                        
                    }
                    }
                        activeOpacity={0.5}
                        style={newStyle.buttonStyle}>
                        <Text style={newStyle.buttonTextStyle}>
                                {this.state.buttonText.toUpperCase()}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            </KeyboardAwareScrollView>
            :            
            <View style={newStyle.container}>

            <View style={newStyle.headerImage}>
                <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                {
                       (this.state.checkBoxError===true || this.state.postalCodeError===true)?this.renderValidation():this.somethingElse()
                }
            </View>

            <View style={newStyle.inputContainer}>

                <Text style={newStyle.firstName}>{this.state.workText}</Text>
                <View style= {newStyle.dropDownStyle}>

                    { Platform.OS==='ios'?
                     <DropdownMenu
                            style={{
                            flex: 1, 
                            marginTop: 20,
                            flexDirection: 'row', 
                            borderRadius: 8, 
                            }}
                            bgColor={'transparent'}
                            tintColor={'#666666'}
                            activityTintColor={'green'}
                            // arrowImg={}      
                            // checkImage={}   
                            // optionTextStyle={{color: '#333333'}}
                            // titleStyle={{color: '#333333'}} 
                            maxHeight={200} 
                            handler={(selection, row) => this.setState({dropDownItem: data[selection][row]})}
                            data={data}> 
                    </DropdownMenu>
                    :
                   <View style={{
                            width: 340,
                            height: 57,
                            borderRadius: 8,
                            backgroundColor: '#f6f6f6',
                            padding: 10,
                            fontFamily: 'WorkSans-Bold',
                            fontWeight: '400',
                            paddingLeft: 0,}}>
                                <Picker
                                    selectedValue={this.state.dropDownItem}
                                    style={{                                          
                                    backgroundColor: '#f6f6f6',
                                    fontFamily: 'WorkSans-Bold',
                                    fontWeight: '400',
                                    padding: 10,                                        
                                }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({dropDownItem: itemValue})}>
                                    <Picker.Item label={this.state.construct} value={this.state.construct} />
                                    <Picker.Item label={this.state.industry} value={this.state.industry} />
                                    <Picker.Item label={this.state.office} value={this.state.office} />
                                </Picker>
                    </View>
                 
                    }

                </View>
                
                {
                    this.state.isLoading===true?
                    <View style = {{position: 'absolute' , zIndex:3999, left: 40, top: 40, right: 0, bottom: 0}}>
                    <BallIndicator color='#e73d50' />
                    </View>:this.somethingElse()
                }

                <Text style={newStyle.postalName}>{this.state.postalCode}</Text>
                <TextInput
                        style={[newStyle.postalInput,{marginTop: 0},]}
                        keyboardType="numeric"
                        placeholder=""
                        underlineColorAndroid= 'transparent'
                        onChangeText= { (postalCodeInput) => this.validationPostalCode(postalCodeInput) } />
                
                <View style={newStyle.policyStyle}> 
                <CheckBox  
                            title=''                                  
                            checked={this.state.checked}
                            checkedColor='red'
                            containerStyle={newStyle.checkBoxStyle}
                            onPress={() => {
                                               this.setState({checked: !this.state.checked});
                                        }
                                 }
                            />                                        

                                {
                                    this.props.navigation.state.params.objectParams.language ==='NEDERLANDS'?
                                    <Text style={{marginTop: 5, fontFamily: 'WorkSans-Bold', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 20}}>{LanguageSettings.dutch.agreementText} {'\n'}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => Linking.openURL('https://jobfixers.be/nl/privacy')}>{LanguageSettings.dutch.policyText}</Text></Text>
                                    :this.props.navigation.state.params.objectParams.language === 'ENGLISH'?
                                    <Text style={{marginTop: 5, fontFamily: 'WorkSans-Bold', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 20}}>{LanguageSettings.english.agreementText} {'\n'}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => Linking.openURL('https://jobfixers.be/nl/privacy')}>{LanguageSettings.english.policyText}</Text></Text>
                                    :
                                    <Text style={{marginTop: 5, fontFamily: 'WorkSans-Bold', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 20}}>{LanguageSettings.french.agreementText} {'\n'} déclaration {'\n'}<Text style={{ color: '#e73d50',fontFamily: 'WorkSans-Bold', fontWeight: '500', fontSize: 20  }} onPress={() => Linking.openURL('https://jobfixers.be/nl/privacy')}>{LanguageSettings.french.policyText}</Text></Text>
                                }
                
                </View>

            </View>

            <View style={newStyle.buttons}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('FormOne',{language: this.state.language,}) }
                    activeOpacity={0.5}
                    style={newStyle.iconStyle}>
                        <Icon
                            containerStyle={newStyle.iconImageStyle}                               
                            name='angle-left'
                            type='font-awesome'
                            color='#fff'
                            size = {40}
                            onPress={() => console.log('hello')} /> 
                </TouchableOpacity>

                <TouchableOpacity onPress={() => 
                {
                    //if(this.state.checked===true && this.state.postalCodeError===false)
                            this.login();

                    //this.props.onButtonPress(this.state.language);                        
                }
                }
                    activeOpacity={0.5}
                    style={newStyle.buttonStyle}>
                    <Text style={newStyle.buttonTextStyle}>
                            {this.state.buttonText.toUpperCase()}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
            
        );
    }

}

const newStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    keyboardScrollViewContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    headerImage: {
        width: scale(viewPortWidth),
        height: verticalScale(viewPortHeight * 0.51),
        flex: Platform.OS === 'ios'?13:11,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    firstInputsBox: {
        width: viewPortWidth,
        height: 70,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',                
        marginBottom: 10,        
    },

    dropDownStyle: {
        width: viewPortWidth,
        height: 60,
        flex:1,
        marginTop: 15,
        marginLeft: 15,
        paddingRight: 25,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'flex-start',           
        zIndex: 999,
    },

    iconImageStyle:{
        backgroundColor: 'black',
        width: 50,
        height: 50
    },

    inputContainer: {
        backgroundColor: 'white',
        marginTop: 15,
        padding: 10,
        paddingTop: 10,
        flex: 18,
        height: 150,
    },

    postalContainer:{
        position: 'relative',
        backgroundColor: 'powderblue',
        zIndex: 989,
        marginTop:20,        
    },

    iconStyleTop: {
        width: 57,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyle: {
        width: 57,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#fad704',
        marginTop: viewPortHeight / 80,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyleNew: {
        width: 57,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyleText: {
        width: 14,
        height: 34,
        fontFamily: 'FontAwesome',
        fontSize: 34,
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#ffffff',
        letterSpacing: 1.42,
        textAlign: 'center'
    },

    firstName: {
        width: scale(220),
        height: verticalScale(19),
        fontFamily: 'WorkSans-Regular',
        fontSize: moderateScale(16),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: moderateScale(5),
        marginTop: moderateScale(5),
        marginLeft: moderateScale(15),
    },

    postalName:{
        width: scale(159),
        height: verticalScale(19),
        fontFamily: 'WorkSans-Regular',
        fontSize: moderateScale(16),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginLeft: moderateScale(15),
        marginBottom: Platform.OS==='ios'?moderateScale(45):moderateScale(15),        
        marginTop:moderateScale(10),
        zIndex:900,
    },

    firstInput: {
        width: 270,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        padding: 10,
    },

    nameInput: {
        width: scale(330),
        height: verticalScale(57),
        top: verticalScale(380),
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        position: 'absolute',
        marginBottom: moderateScale(15),
        padding: moderateScale(10),
        marginLeft: moderateScale(15),
        zIndex: 900
    },

    postalInput: {
        width: 340,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        padding: 10,
        marginLeft: 15,
        zIndex: 999
    },

    buttons: {
        width: viewPortWidth,
        height: 50,
        flex: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',        
    },

    buttonStyle: {
        width: 266,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#e73d50',
        marginTop: viewPortHeight / 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTextStyle: {
        width: 266,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        color: '#ffffff',
        letterSpacing: 0.67,
        textAlign: 'center'
    },

    checkBoxStyle: {
        width: 25,
        height: 30,
        backgroundColor: 'white',
        borderColor: 'white',
        padding: 0,
        marginLeft:15,
    },

    policyStyle: {
        width: viewPortWidth,
        height: 105,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 20,
        paddingLeft: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',        
    },

     policyTextStyle: {
         width: 310,
         height: 85,
         fontFamily: 'WorkSans-Regular',
         fontSize: 16,
         fontWeight: 'normal',
         fontStyle: 'normal',
         letterSpacing: 0,
         textAlign: 'left',
         marginTop: 5,
         padding: 0,
     },

     iconImageStyle:{
         backgroundColor: 'black',
         width: 50,
         height: 50
     },

     validationStyle:{
        position: 'absolute',
        top: 62,
        left: 35,
        width: 60,
        height: 60,    
    }

});

FormTwo.propTypes = {
    language: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
    //   navigateBack: (language) => this.props.navigation.navigate('FormOne',{language: language,}),
    //   onButtonPress: (language) => this.props.navigation.navigate('ThankYouScreen',{language: language}),
  
    //   navigateBack: (language) => dispatch(NavigationActions.navigate({routeName: 'FormOne', params:{language: language}})),
    //   onButtonPress: (language) => dispatch(NavigationActions.navigate({routeName: 'ThankYouScreen', params:{language: language}})),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormTwo);