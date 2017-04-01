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
  ListView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'; 
import SearchResult from './SearchResult'; 


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

export default class AssetMapView extends Component {  
  
  constructor(props) {  
    super(props);  
     this.state = {
         BaiduLng:"",
         BaiduLat:"",
         url:"map.baidu.com"
    }; 
  }  
  
  componentWillMount() {
        //这里获取从Search传递过来的参数: SearchAssetNo
        this.setState({BaiduLng: this.props.BaiduLng,BaiduLat:this.props.BaiduLat},function(){
             this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+this.state.BaiduLat+','+this.state.BaiduLng+'&mode=driving&region=厦门&output=html'})
        } 
        );        
 }


    render() {  
    return ( 
          <WebView
              //source={{uri:this.state.url}}
              source={{uri:"this.state.url"}}              
              scalesPageToFit ={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
          />  
         )
    }
}
  

const styles = StyleSheet.create({  
 container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
  webView: {
    //backgroundColor: BGWASH,
    //height: 350,
  },
  
});  
