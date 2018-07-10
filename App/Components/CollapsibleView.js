import {AccordionList} from "accordion-collapse-react-native";
import { View, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

class CollapsibleView extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
    list:[
        {
          title: '14.03.2018 - 14.04.2018',
          body: 'Correction -- Ann Contract - 1 ',
          time: 'Time 6:00',
          newTime: 'New Time 8:00',
        },
        {
          title: '14.03.2018 - 14.04.2018',
          body: 'Correction -- Ann Contract - 1 ',
          time: 'Time 6:00',
          newTime: 'New Time 8:00',
        },
        {
          title: '14.03.2018 - 14.04.2018',
          body: 'Correction -- Ann Contract - 1 ',
          time: 'Time 6:00',
          newTime: 'New Time 8:00',
        }
        ],
  }
}

_head(item){
    return(
        <View style={ newStyle.borderBottom}>
          <Text style={{ color: '#000',  
                        fontFamily: "WorkSans-Medium",
                         fontSize: 14 }}>
            {item.title}
          </Text>
         
          <TouchableOpacity onPress={ ( ) => {} }
                                    activeOpacity={0.5}
                                    style={newStyle.iconStyle}>
            <Icon
              containerStyle={newStyle.iconImageStyle}
              name='exclamation-triangle'
              type='font-awesome'
              color='#E73D50'
              size = {15}
              onPress={() => console.log('hello')} /> 

          </TouchableOpacity>
        </View>
    );
}

_body(item){
    return (
        <View style={{padding:5}}>
          <Text style={ newStyle.fontStyle }>{item.body}</Text>
          <Text style={newStyle.fontStyle}>{item.time}</Text>
          <Text style={newStyle.fontStyle}>{item.newTime}</Text>
        </View>
    );
}

render() {
    return (
          <View style= {{ flex: 1,backgroundColor: 'white', marginTop: 0, justifyContent: 'flex-start', alignItems:'flex-start'   }}>
          <AccordionList
            list={this.state.list}
            header={this._head}
            body={this._body}
          />
          </View>
    );
}

}

const newStyle = StyleSheet.create({

borderBottom: {
  width: viewPortWidth*0.75,
  height: 30,
  borderBottomColor: "#000",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'transparent',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 10,
  flexDirection: 'row'
},

fontStyle: {
  fontFamily: "WorkSans-Medium",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'left',
  color: "rgb(231, 61, 80)",
},

iconImageStyle:{
  width: 13,
  height: 16,
  fontFamily: "FontAwesome",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'right',
  color: "rgb(231, 61, 80)", 
},

iconStyle: {
  width: 30,
  height: 30,
  borderRadius: 0,
  backgroundColor: 'transparent',
  // marginTop: viewPortHeight / 80,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginLeft: 10,
},

});

export default CollapsibleView;
