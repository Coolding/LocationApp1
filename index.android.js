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
import Map from './map';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';




var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,
  // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  //sync: require('./sync')
})  

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
// 对于web
// window.storage = storage;
// 对于react native
 global.storage = storage;
// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了

export default class LoactionApp1 extends Component {
 constructor(props){
        super(props);
        this.state = {
        selectedTab:'home'
        };
    }
  render() {
    let defaultName = 'ScanUpload';
    let defaultComponent = ScanUpload;
    return (       
     <View style={{flex: 1}}>
        <TabNavigator   Style={styles.tab} >
            <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Image source={require('./assets/1.jpg')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/1.jpg')} style={styles.iconStyle}/>}
            badgeText="tips"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            
            <Home {...this.props}/>
            </TabNavigator.Item>
            
            <TabNavigator.Item                   //手动输入设备信息，上传GPS定位信息
            selected={this.state.selectedTab === 'UploadGps'}
            title="UploadGps"
            renderIcon={() => <Image source={require('./assets/1.jpg')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/1.jpg')}  style={styles.iconStyle}/>}
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
            renderIcon={() => <Image source={require('./assets/1.jpg')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/1.jpg')}  style={styles.iconStyle}/>}
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
            renderIcon={() => <Image source={require('./assets/1.jpg')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/1.jpg')} style={styles.iconStyle}/>}
            badgeText=""
            onPress={() => this.setState({ selectedTab: 'map' })}>
            <Map {...this.props}/>
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
