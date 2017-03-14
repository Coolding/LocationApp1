'use strict';  
import React, { Component } from 'react';  
import {  
  StyleSheet,  
  View,  
  WebView,  
  Dimensions,  
  Text,
  TextInput,
  Button,
} from 'react-native'; 
import SearchResult from './SearchResult'; 
import ScanSearch from './ScanSearch'; 

  
const {width, height} = Dimensions.get('window');  
  
var url='http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html'

export default class Search extends Component {  
  
  constructor(props) {  
    super(props); 
     this.state = {
     toSearchAssetNo:""
    }; 
  }  
  
 


  //点击查找之后，跳转到信息和地图显示页面
 ShowMap=()=>{
     const { navigator } = this.props;
     navigator.replace({
        name: 'SearchResult',
        component: SearchResult,
        params: {
        SearchAssetNo: this.state.toSearchAssetNo
        }});
 }

//跳转到扫描（电能表二维码）批量定位页面
 gotoScanSearch=()=>{
     const { navigator } = this.props;
     navigator.replace({
        name: 'ScanSearch',
        component: ScanSearch,
        });
 }

  render() {  
    return (  
      <View style={styles.container}>  
      <Text>请输入你想要定位导航的设备信息（如户号、表号、表箱号等）{'\n'}</Text>
      <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) =>   this.setState({toSearchAssetNo:text})  }
         />
          <Button
        onPress={this.ShowMap}
        title="查找"
        color="#841584"
        accessibilityLabel=""
        />
        <Text> {'\n'}</Text>
         <Button
        onPress={this.gotoScanSearch}
        title="扫描条码批量定位"
        color="#FF00FF"
        accessibilityLabel=""
        />
      </View>
    )
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f2f2f2',  
    paddingTop:20,  
  },  
  webView: {
    //backgroundColor: BGWASH,
    height: 350,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    margin: 2,
    //padding:10,
    borderWidth:1,
  	borderRadius:5,
  },
});  



 