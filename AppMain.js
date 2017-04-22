 
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
  Image,
  Dimensions
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
import NavRegist from './NavRegist';

 
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
 
export default class AppMain extends React.Component {

    constructor(props) {  
    super(props); 
     this.state = {
      selectedTab:'home',
    }; 

  
  }  

render() { 
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
              initialRoute={{ name: 'ScanUpload', component: ScanUpload }}
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