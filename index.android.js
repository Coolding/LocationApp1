/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';


var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

export default class LoactionApp1 extends Component {

GetGpsLocation = () => {
  
  navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        alert(initialPosition.coords.latitude);
        let formData=new FormData();
        formData.append("longitude",initialPosition.coords.longitude);
        formData.append("latitude",initialPosition.coords.latitude);
        formData.append("RecordTime",getNowFormatDate());
        let url="http://1.loactionapp.applinzi.com/upload";
        fetch(url,{method:"POST",headers:{},body:formData});
      },
      (error) => alert(error)
    );
}

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.TouchableStyle}            
            onPress={this.GetGpsLocation}
          >
            <Image style={styles.bottomIconStyle}
              source={require('./assets/1.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableStyle}
            //onPress={this.switchType}
          >
            <Image style={styles.bottomIconStyle}
              source={require('./assets/2.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableStyle}
            //onPress={this.switchType}
          >
            <Image style={styles.bottomIconStyle}
              source={require('./assets/3.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableStyle}
            //onPress={this.switchType}
          >
            <Image  style={styles.bottomIconStyle}
              source={require('./assets/4.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableStyle}
            //onPress={this.switchType}
          >
            <Image  style={styles.bottomIconStyle}
              source={require('./assets/5.jpg')}
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    //backgroundColor: 'blue',
    position:'absolute',
    //paddingTop : 50,
    //paddingLeft: 110,
    //paddingRight: 50, 
    //height:10,
    //top:h*0.6-3,
    //bottom:50,
    width:w,
    bottom:0,
    //height:w,
    
  },
  TouchableStyle:{
    //flex:1,
    //flexDirection: 'row',
    //justifyContent: 'flex-start',
    //alignItems: 'flex-end',
    //padding: 0,
    //width:40,
    //height:120,
    //height:100,
    //flexDirection: 'row',
    //alignItems: 'flex-end',
    //backgroundColor: 'red',
  },
  bottomIconStyle:{
    //flex:1,    
    width:w/5,
    height:w/5
    //resizeMode:'contain',
    //position:'absolute',
    //bottom:0,
    //marginBottom:0,
    //height:w/8,
  },
});

AppRegistry.registerComponent('LoactionApp1', () => LoactionApp1);