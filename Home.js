import React, { Component } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default class Home extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'home'
    };
 }
 
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#eee',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'#f00'}}>我是TestPage，导入使用的!</Text>
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