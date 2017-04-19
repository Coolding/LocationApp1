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






var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高


export default class LoactionApp1 extends Component {
 constructor(props){
        super(props);
        this.state = {
        selectedTab:'home',
        RegStatus:0,   //默认先显示Loading页面
        test:""
        };

    };

componentWillMount() {
//检查注册信息，以便判断用户打开APP之后是跳转到注册，登录还是系统界面
    let ReadStatus;
    let userID;
    let tel;
    // AsyncStorage.getItem('tel').then((value) => {alert('注册的手机号是：'+value);}  )     
    try{    //如果还没有注册或者是新手机，则变量storage还未定义（在注册时或者换了新手机，首次登录才会定义）
                    AsyncStorage.getItem('tel').then((value) => tel=value  )      
                     AsyncStorage.getItem('userID').then((value) => {userID=value;alert('userID是'+value+"tel是"+tel); } )     
                    
                    
                     AsyncStorage.getItem('RegStatus').then((value) => { 
                              if(value==2)  //已登录
                                  {  this.setState({RegStatus:3})  } 
                              else{  //还没登录，获取审批状态
                                        //alert(ret.department)
                                        let url="http://1.loactionapp.applinzi.com/GetUserStatus/"+userID;
                                        fetch(url,{method:"GET"}).then(response => response.json())
                                        .then(data => {
                                                    if(data==1) this.setState({RegStatus:2})   //已审批通过，显示登录页面，同时显示审批情况
                                                    else if (data==0) this.setState({RegStatus:1})   //还未审批，显示登录页面，同时显示审批情况
                                                    else if(data==-1) this.setState({RegStatus:-2})   //审批不通过，显示注册页面（重新注册）
                                                    else if(data==-2) this.setState({RegStatus:-3})   //没找到该ID，一般是不会发生，显示注册页面
                                                    //alert(this.state.RegStatus)
                                        })    //加1是因为处理数据库里面app上传的地址，还有1个根据用电地址反推的定位信息
                                        .catch(e => console.log("Oops, error", e))
                              }
                    });
                    
    }
    catch (e) {
        //alert("没找到storage")
        this.setState({RegStatus:-1})  //还没注册（或者换新手机），显示注册页面
    } finally {
        console.log('finally');
    }


    }

 


  render() {
    let defaultName = 'ScanUpload';
    let defaultComponent = ScanUpload;

    if(this.state.RegStatus==-3)  //没找到该ID，一般是不会发生，显示注册页面
      return (<Regist RegStatus='没找到该注册ID，请重新注册' />);
    if(this.state.RegStatus==-2)  //审批不通过（可能一些信息没填完整），显示注册页面（重新注册）
      return (<Regist RegStatus='审批不通过，请重新注册，注意信息填写要完整，准确' />);
    if(this.state.RegStatus==-1)  //还没注册过，显示注册页面
      return (<Regist RegStatus='' />);
    if(this.state.RegStatus==0)  //默认先打开加载等待页面
      return (<Loading/>);
      //return (<Login RegStatus='测试' />);
    if(this.state.RegStatus==1)  //还未审批，显示登录页面，同时显示审批情况
      return (<Login RegStatus='还未审批，请耐心等待' />);
    if(this.state.RegStatus==2)  //已审批通过，显示登录页面，同时显示审批情况
      return (<Login RegStatus='已审批通过' />);
      
      if(this.state.RegStatus==3)   //已注册且已登录，显示程序主界面    
        return (       
     <View style={{flex: 1}}>
        <TabNavigator   Style={styles.tab} >
            <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Image source={require('./assets/1.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/12.png')} style={styles.iconStyle}/>}
            badgeText=""
            onPress={() => this.setState({ selectedTab: 'home' })}>
            
            <Home {...this.props}/>
            </TabNavigator.Item>
            
            <TabNavigator.Item                   //手动输入设备信息，上传GPS定位信息
            selected={this.state.selectedTab === 'UploadGps'}
            title="UploadGps"
            renderIcon={() => <Image source={require('./assets/2.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/22.png')}  style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'UploadGps' })}>

            <Navigator
              initialRoute={{ name: 'UploadGps', component: UploadGps }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />   
            </TabNavigator.Item>
           
            <TabNavigator.Item                       //扫描设备条码，上传GPS定位信息
            selected={this.state.selectedTab === 'ScanUpload'}
            title="ScanUpload"
            renderIcon={() => <Image source={require('./assets/3.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/32.png')}  style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'ScanUpload' })}>
            
            <Navigator
              initialRoute={{ name: defaultName, component: defaultComponent }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />            
            </TabNavigator.Item>

            <TabNavigator.Item
            selected={this.state.selectedTab === 'map'}
            title="map"
            renderIcon={() => <Image source={require('./assets/4.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/42.png')} style={styles.iconStyle}/>}
            badgeText=""
            onPress={() => this.setState({ selectedTab: 'map' })}>
            
            <Navigator
              initialRoute={{ name: 'Search', component: Search }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />   
            </TabNavigator.Item>
          </TabNavigator>
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
