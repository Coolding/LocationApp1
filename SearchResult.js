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
} from 'react-native'; 
import Search from './Search'; 
  
const {width, height} = Dimensions.get('window');  
  

var addrCount=0,    //该assetNo共有几个地址信息
     CurrentAddrIndex=0;
 var   addrArray=[];



export default class SearchResult extends Component {  
  
  constructor(props) {  
    super(props);  
     this.state = {
     toSearchAssetNo:"", 
     currentAssetNo:"",
     currentElecAddr:"获取中",
     currentDataSource:"",
     url:"http://map.baidu.com/"

    }; 
  }  
  
  componentWillMount() {
        //这里获取从Search传递过来的参数: SearchAssetNo
        this.setState({toSearchAssetNo: this.props.SearchAssetNo},function(){
            //查找SearchAssetNo在数据库里面是否已有人上传过的GPS地址
            let url="http://1.loactionapp.applinzi.com/GetGPSInfo/"+this.props.SearchAssetNo;
            fetch(url,{method:"GET"}).then(response => response.json())
            .then(data => {
                //this.setState({}) 
                addrArray=data;
                addrCount=data.length+1; 
                CurrentAddrIndex=0;
                this.setState({currentAssetNo:addrArray[CurrentAddrIndex]['AssetInfo'],currentElecAddr:addrArray[CurrentAddrIndex]['elecAddr'],currentDataSource:addrArray[CurrentAddrIndex]['数据来源']}) 
                this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+addrArray[CurrentAddrIndex]['BaiduLatitude']+','+addrArray[CurrentAddrIndex]['BaiduLongitude']+'&mode=driving&region=厦门&output=html'})
            })    //加1是因为处理数据库里面app上传的地址，还有1个根据用电地址反推的定位信息
            .catch(e => console.log("Oops, error", e))
        } 
        );        
 }

 forwardAddr =() =>{
     if(CurrentAddrIndex==0)
        alert("已经是第一个了");
     else{
     CurrentAddrIndex=CurrentAddrIndex-1;
     this.setState({currentDataSource:addrArray[CurrentAddrIndex]['数据来源']}) ;
     this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+addrArray[CurrentAddrIndex]['BaiduLatitude']+','+addrArray[CurrentAddrIndex]['BaiduLongitude']+'&mode=driving&region=厦门&output=html'})
            
     }  
 }

 nextAddr =() =>{
     if(CurrentAddrIndex==(addrCount-2))
        alert("已经是最后一个了");
     else{ 
        CurrentAddrIndex=CurrentAddrIndex+1  ;   
        this.setState({currentDataSource:addrArray[CurrentAddrIndex]['数据来源']}) ;
        this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+addrArray[CurrentAddrIndex]['BaiduLatitude']+','+addrArray[CurrentAddrIndex]['BaiduLongitude']+'&mode=driving&region=厦门&output=html'})
     
     }     
 }



  render() {  
    return (  
      <View style={styles.container}>  
      <TouchableOpacity onPress={this.forwardAddr}>
            <Text>上一个</Text>
      </TouchableOpacity>
      <Text>一共查找到个{addrCount}定位信息{'\n'}
        ({CurrentAddrIndex+1})设备编号： {this.state.currentAssetNo}{'\n'}
        用电地址{this.state.currentElecAddr}{'\n'}
        数据来源：{this.state.currentDataSource}{'\n'}
      </Text>      

      <TouchableOpacity onPress={this.nextAddr}>
            <Text>下一个</Text>
      </TouchableOpacity>
      <WebView
          style={styles.webView}
          source={{uri:this.state.url}}
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
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    margin: 2,
    //padding:10,
    borderWidth:1,
  	borderRadius:5,
  },
});  



 