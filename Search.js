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

  
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
  
var url='http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html';
 

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
              <View  style={{height:40,width:w,backgroundColor:'#ff9a00',justifyContent: 'center',marginBottom:1}} ><Text style={{fontSize:20,textAlign:'center'}}>查找和定位</Text></View> 
            <View style={{backgroundColor:'white',borderRadius:5,marginBottom:10}}>
            
            <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
                <TextInput
                style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                underlineColorAndroid="transparent"
                placeholder="输入要查找和导航的表(箱)号，户号等"
                onChangeText={(text) =>   this.setState({toSearchAssetNo:text})  }
                  />
                <View style={{marginLeft:w*0.02,marginBottom:10,height:45,width:w*0.15}}>
                    <Button    
                        sytle={styles.BottonStyle}              
                        onPress={this.ShowMap}
                        title="查找"                
                        color="#ff9a00"                        
                        accessibilityLabel=""
                        />
                </View>
            </View>
         </View>
  </View>
 
    
    )
  }  
}  
  
const styles = StyleSheet.create({  
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
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



 