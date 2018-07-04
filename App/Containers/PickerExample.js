// import React, { Component } from 'react'
// import {
//     Text,
//     View,
//     PickerIOS,
// } from 'react-native';

// const viewPortHeight = Dimensions.get('window').height;
// const viewPortWidth = Dimensions.get('window').width;


// class PickerExample extends Component {

// componentDidMount() {
//     Animated.timing(this.props.offSet, {
//        duration: 300,
//        toValue: 100
//      }).start()
//  }

//  closeModal() {
//     Animated.timing(this.props.offSet, {
//        duration: 300,
//        toValue: viewPortHeight
//     }).start(this.props.closeModal);
//  }

// render() {
//    return (
//      <Animated.View style={{ transform: [{translateY: this.props.offSet}] }}>
//          <View style={styles.closeButtonContainer}>
//            <TouchableHighlight onPress={ this.closeModal } underlayColor="transparent" style={styles.closeButton}>
//              <Text style={styles.closeButtonText}>Choose</Text>
//            </TouchableHighlight>
//          </View>
//          <PickerIOS
//          selectedValue={this.props.showData}
//          onValueChange={(data) => this.props.changeData(data)}>
//          {Object.keys(showData).map((data) => (
//            <PickerItemIOS
//              key={data}
//              value={data}
//              label={showData[data].data}
//            />
//          ))}
//        </PickerIOS>
//      </Animated.View>   
//    )
//  }
// }

// var styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    marginTop: 60
//  },
//  showtimeContainer: {
//   borderTopColor: '#ededed', 
//    borderTopWidth:1
//  },
//  showtime: {
//   padding:20, 
//    textAlign: 'center'
//  },
//  button: {
//   marginTop:25, 
//    marginBottom:25
//  },
//  closeButtonContainer: {
//   flexDirection: 'row', 
//    justifyContent: 'flex-end', 
//    borderTopColor: '#e2e2e2', 
//    borderTopWidth: 1, 
//    borderBottomColor: '#e2e2e2', 
//    borderBottomWidth:1
//  },
//  closeButton: {
//   paddingRight:10, 
//    paddingTop:10, 
//    paddingBottom:10
//  },
//  buttonText: {
//   textAlign: 'center'
//  },
//  closeButtonText: {
//   color: '#027afe'
//  },
// });