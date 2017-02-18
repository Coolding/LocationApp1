'use strict';  
import React, { Component } from 'react';  
import {  
  StyleSheet,  
  View,  
  WebView,  
  Dimensions,  
} from 'react-native';  
  
const {width, height} = Dimensions.get('window');  
  
const url = "http://api.map.baidu.com/marker?location=39.916979519873,116.41004950566&title=我的位置&content=百度奎科大厦&output=html ";  
export default class Map extends Component {  
  
  constructor(props) {  
    super(props);  
  }  
  
  render() {  
    return (  
      <View style={styles.container}>  
        <WebView  
          style={{width:width,height:height-20,backgroundColor:'gray'}}  
          source={{uri:url,method: 'GET'}}  
          javaScriptEnabled={true}  
          domStorageEnabled={true}  
          scalesPageToFit={false}  
          />  
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f2f2f2',  
    paddingTop:20,  
  },  
});  