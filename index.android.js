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
  Navigator,
  Button,
  Image
} from 'react-native';
import UploadGps from './UploadGps';
import Home from './Home';
import ScanUpload from './ScanUpload';
import ScanUploadResult from './ScanUploadResult';
import Search from './Search';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import Login from './Login';
import Regist from './regist';
import Loading from './Loading';
import NavLogin from './NavLogin';
import AppMain from './AppMain';

var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高


export default class LoactionApp1 extends Component {
 constructor(props){
        super(props);
        this.state = {
        selectedTab:'home',
        LoginStatus:0,   //是否已登录，默认先显示Loading页面
        test:""
        };

    };

componentWillMount() {
//检查登录信息，以便判断用户打开APP之后是跳转到登录页面还是系统主界面
    let ReadStatus;
    let userID;
    let tel;
    try{   
          AsyncStorage.getItem('tel').then((value) => { 
            if(value!=null)  this.setState({LoginStatus:1})  //已登录
            else this.setState({LoginStatus:-1})  //还没登录
              });
                    
      }
    catch (e) {
        this.setState({LoginStatus:-1})  //还没登录
        } 
}

render() {
    if(this.state.LoginStatus==0)  //默认先打开加载等待页面
      return (<Loading/>);
    if(this.state.LoginStatus==1)   //已登录，显示程序主界面    
        return <AppMain />
    if(this.state.LoginStatus==-1)  //还没登录
       return (<NavLogin />);    
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
  iconStyle:{                  //底部tab导航栏样式
       width:26,
       height:26,
   },
   textStyle:{        
       color:'#999',
   },
   selectedTextStyle:{
       color:'black',
   },
  ButtonStyle:{
    position:'absolute',
    top:50,
  },
   tab: {
        height: 100,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    himiTextStyle:{
      backgroundColor:'#eee',
      color:'#f00',
      fontSize:30,
      marginTop:30,
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
