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
import ScanSearch from './ScanSearch'; 



 


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var a=[]
var b=""

 


export default class SearchResult extends Component {  
  
  constructor(props) {  
    super(props);  
     this.state = {
         AllScanedAssetNo:""
 
    }; 
  }  
  


  componentWillMount() {
        //这里获取从Search传递过来的参数: SearchAssetNo
        this.setState({AllScanedAssetNo: this.props.AllScanedAssetNo},function(){      
          // b=this.state.AllScanedAssetNo
          // a=b.split(" ")
            //查找SearchAssetNo在数据库里面是否已有人上传过的GPS地址
            // let url="http://1.loactionapp.applinzi.com/GetGPSInfo/"+this.props.SearchAssetNo;
            // fetch(url,{method:"GET"}).then(response => response.json())
            // .then(data => {
            //     //this.setState({}) 
            //     addrArray=data;
            //     addrCount=data.length+1; 
            //     CurrentAddrIndex=0;
            //     this.setState({GPSLng:addrArray[CurrentAddrIndex]['BaiduLongitude'],GPSLat:addrArray[CurrentAddrIndex]['BaiduLatitude'],currentAssetNo:addrArray[CurrentAddrIndex]['AssetInfo'],currentElecAddr:addrArray[CurrentAddrIndex]['elecAddr'],currentDataSource:addrArray[CurrentAddrIndex]['数据来源'],RecordMan:addrArray[CurrentAddrIndex]['RecordMan'],RecordTime:addrArray[CurrentAddrIndex]['RecordTime']}) 
            //     this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+addrArray[CurrentAddrIndex]['BaiduLatitude']+','+addrArray[CurrentAddrIndex]['BaiduLongitude']+'&mode=driving&region=厦门&output=html'})
            // })    //加1是因为处理数据库里面app上传的地址，还有1个根据用电地址反推的定位信息
            // .catch(e => console.log("Oops, error", e))
            console.log(this.state.AllScanedAssetNo)
     } 
        );        
 }

 


  render() {  
    return (  
      <View style={styles.container}>  
      <View  style={{height:40,width:w,backgroundColor:'#ff9a00',justifyContent: 'center',marginBottom:1}} ><Text style={{fontSize:20,textAlign:'center'}}>查找结果</Text></View>
       <Text>{this.state.AllScanedAssetNo[0]}{'\n'}{'\n'}
         
       </Text>
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



 