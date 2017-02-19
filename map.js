'use strict';  
import React, { Component } from 'react';  
import {  
  StyleSheet,  
  View,  
  WebView,  
  Dimensions,  
} from 'react-native';  
  
const {width, height} = Dimensions.get('window');  
  
var url = "http://1.loactionapp.applinzi.com/showMap/118.120925,24.476224";  



export default class Map extends Component {  
  
  constructor(props) {  
    super(props);  
  }  
  
  render() {  
    return (  
      <View style={styles.container}>  
      <WebView
          style={styles.webView}
          source={{uri:url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
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
});  