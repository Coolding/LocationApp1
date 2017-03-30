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

 //改进： 
//1.目前APP在搜索时，是从GpsInfo里面去查找有无相关GPS信息，但是这样的话如果GpsInfo里面还未有人上传，后续的操作“根据用电地址自动返回一个
//导航信息”就会失败，因为从数据库GpsInfo里面没有获取到用电地址
//2.nextAddr函数里面的操作：根据用电地址返回经纬度这一步可能遇到的问题有：
//百度API对于address字段可能会出现中文或其它一些特殊字符（如：空格），对于类似的字符要进行编码处理，编码成 UTF-8 字符的二字符十六进制值
//参考网址http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
//3.地址准不准评价：用点赞的图标
//4.如果同一电表（设备）系统有很多个人上传的地址，是否限制只显示几个就可以了，显示太多反而让用户无从选择


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
     url:"http://map.baidu.com/",
     RecordMan:"",
     RecordTime:"",
     GPSLat:"",
     GPSLng:""
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
                this.setState({GPSLng:addrArray[CurrentAddrIndex]['BaiduLongitude'],GPSLat:addrArray[CurrentAddrIndex]['BaiduLatitude'],currentAssetNo:addrArray[CurrentAddrIndex]['AssetInfo'],currentElecAddr:addrArray[CurrentAddrIndex]['elecAddr'],currentDataSource:addrArray[CurrentAddrIndex]['数据来源'],RecordMan:addrArray[CurrentAddrIndex]['RecordMan'],RecordTime:addrArray[CurrentAddrIndex]['RecordTime']}) 
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
     this.setState({RecordMan:addrArray[CurrentAddrIndex]['RecordMan']}) ;
     this.setState({RecordTime:addrArray[CurrentAddrIndex]['RecordTime']}) ;
     this.setState({GPSLng:addrArray[CurrentAddrIndex]['BaiduLongitude']}) ;
    this.setState({ GPSLat:addrArray[CurrentAddrIndex]['BaiduLatitude']}) ;
     this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+addrArray[CurrentAddrIndex]['BaiduLatitude']+','+addrArray[CurrentAddrIndex]['BaiduLongitude']+'&mode=driving&region=厦门&output=html'})
            
     }  
 }

 nextAddr =() =>{
     if(CurrentAddrIndex==(addrCount-1))
        alert("已经是最后一个了");
     else{ 
       if(CurrentAddrIndex==(addrCount-2)){   //系统数据库里有的地址已经到最后一个了，现在根据用电地址自动判断经纬度，然后返回导航信息
            CurrentAddrIndex=CurrentAddrIndex+1  ;   
            this.setState({currentDataSource:"根据用电地址自动生成"}) ;
            this.setState({RecordMan:""});
            this.setState({RecordTime:""});
            this.setState({GPSLng:""}) ;
            this.setState({ GPSLat:""}) ;
            //根据用电地址返回百度经纬度（利用百度API）
            let url="http://api.map.baidu.com/geocoder/v2/?address="+addrArray[CurrentAddrIndex-1]['elecAddr']+"&output=json&ak=hAYszgjy50mrlSDBIusNfSc4"
            let lng=0;
            let lat=0;
            fetch(url,{method:"GET"}).then(response => response.json())
            .then(data => {
                 lng=data['result']['location']['lng'] 
                 lat=data['result']['location']['lat'] 
                 this.setState({currentDataSource:"根据用电地址自动生成，可信度："+data['result']['confidence']}) ;
                 //根据返回的经纬度生成导航路线url
                 this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+lat+','+lng+'&mode=driving&region=厦门&output=html'})
             })    
            .catch(e => console.log("Oops, error", e))
            
            
       }
       else {
            CurrentAddrIndex=CurrentAddrIndex+1  ;   
            this.setState({currentDataSource:addrArray[CurrentAddrIndex]['数据来源']}) ;
            this.setState({RecordMan:addrArray[CurrentAddrIndex]['RecordMan']}) ;
            this.setState({RecordTime:addrArray[CurrentAddrIndex]['RecordTime']}) ;
            this.setState({GPSLng:addrArray[CurrentAddrIndex]['BaiduLongitude']}) ;
            this.setState({ GPSLat:addrArray[CurrentAddrIndex]['BaiduLatitude']}) ;
            this.setState({url:'http://api.map.baidu.com/direction?origin=24.496860384,118.04624843&destination='+addrArray[CurrentAddrIndex]['BaiduLatitude']+','+addrArray[CurrentAddrIndex]['BaiduLongitude']+'&mode=driving&region=厦门&output=html'})
       }
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
        GPS上传人员：{this.state.RecordMan}{'\n'}
        GPS上传时间：{this.state.RecordTime}{'\n'}
        经纬度：{this.state.GPSLat},{this.state.GPSLng}{'\n'}
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



 