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
  Linking,
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
         url:""
    }; 
  }  
  
  componentWillMount() {
        //这里获取从Search传递过来的参数: SearchAssetNo
        this.setState({BaiduLng: this.props.BaiduLng,BaiduLat:this.props.BaiduLat},function(){
         this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+this.state.BaiduLat+','+this.state.BaiduLng+'&mode=driving&region=厦门&output=html'})
      } 
        );        
 }

openUrl=() =>{
var url = this.state.url
     Linking.openURL(url)  
     .catch((err)=>{  
       console.log('An error occurred', err);  
     });
 

}

    render() {  
    return ( 
      <View style={styles.container}>
         <Text>地图加载中，请稍候</Text>
         <Button   
         onPress={this.openUrl}
                            title="上传"                
                            color="#ff9a00"
                             accessibilityLabel="Learn more about this purple button"
                            />
          <WebView
              style={{height:h,width:w}}
              //source={{uri:this.state.url}}   
              source={require('./map.html')}           
              scalesPageToFit ={true}
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
