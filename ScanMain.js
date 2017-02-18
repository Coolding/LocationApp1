import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';

export default class ScanMain extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'ScanMain'
    };
 }
 
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#eee',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'#f00'}}>我是ScanMain!</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 100,
  },
  textStyle:{
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  }
})