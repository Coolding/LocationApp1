import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Navigator,        
} from 'react-native';
import Regist from './regist';

export default class NavRegist extends Component {
 constructor(props) {
 super(props);
 this.state = {
      
    };
 }
 
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#eee',justifyContent:'center'}}>
             <Navigator
              initialRoute={{ name: 'Regist', component: Regist }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />  
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