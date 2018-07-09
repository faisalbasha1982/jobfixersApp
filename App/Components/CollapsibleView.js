import {AccordionList} from "accordion-collapse-react-native";
import { View, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { StyleSheet } from 'react-native';

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
        </View>
    );
}

_body(item){
    return (
        <View style={{padding:10}}>
          <Text style={ newStyle.fontStyle }>{item.body}</Text>
          <Text style={newStyle.fontStyle}>{item.time}</Text>
          <Text style={newStyle.fontStyle}>{item.newTime}</Text>
        </View>
    );
}

render() {
    return (
          <View style= {{ flex: 1, backgroundColor: 'white', marginTop: 0, justifyContent: 'flex-start', alignItems:'flex-start'   }}>
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
  width: viewPortWidth*0.60,
  height: 50,
  borderBottomColor: "#000",
  borderBottomWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
},

fontStyle: {
  fontFamily: "WorkSans-Medium",
  fontSize: 11,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.67,
  textAlign: 'center',
  color: "rgb(231, 61, 80)",
}

});

export default CollapsibleView;
