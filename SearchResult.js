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
import Search from './Search'; 
import AssetMapView from './AssetMapView'; 

 //改进： 
//1.目前APP在搜索时，是从GpsInfo里面去查找有无相关GPS信息，但是这样的话如果GpsInfo里面还未有人上传，后续的操作“根据用电地址自动返回一个
//导航信息”就会失败，因为从数据库GpsInfo里面没有获取到用电地址
//2.nextAddr函数里面的操作：根据用电地址返回经纬度这一步可能遇到的问题有：
//百度API对于address字段可能会出现中文或其它一些特殊字符（如：空格），对于类似的字符要进行编码处理，编码成 UTF-8 字符的二字符十六进制值
//参考网址http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
//3.地址准不准评价：用点赞的图标
//4.如果同一电表（设备）系统有很多个人上传的地址，是否限制只显示几个就可以了，显示太多反而让用户无从选择
//提示当前系统有多少电表，表箱……位置信息可供查询定位


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

var addrCount=" 获取中，请稍候……",    //该assetNo共有几个地址信息
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

//点击某一条查找结果时，根据其对应的经纬度，跳转显示当前位置到此设备的路线地图，以便导航
 ShowAssetMap=(lng,lat)=>{
     const { navigator } = this.props;
     navigator.replace({
        name: 'AssetMapView',
        component: AssetMapView,
        params: {
        BaiduLng: lng,
        BaiduLat:lat
        }});
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
      <View  style={{height:40,width:w,backgroundColor:'#ff9a00',justifyContent: 'center',marginBottom:1}} ><Text style={{fontSize:20,textAlign:'center'}}>查找结果</Text></View>

      <ScrollView>
          <View style={{width:w,backgroundColor:'white',justifyContent: 'center',marginBottom:5}}>
              <Text>一共查找到{addrCount}个关于{this.state.toSearchAssetNo}的定位信息{'\n'}
                  设备编号： {this.state.currentAssetNo}{'\n'}
                  地址：{this.state.currentElecAddr}{'\n'}
              </Text>      
          </View>
            <View>
        {  
            //  addrArray=data;
            //     addrCount=data.length+1; 
            //     CurrentAddrIndex=0;
            //     this.setState({GPSLng:addrArray[CurrentAddrIndex]['BaiduLongitude'],GPSLat:addrArray[CurrentAddrIndex]['BaiduLatitude'],currentAssetNo:addrArray[CurrentAddrIndex]['AssetInfo'],currentElecAddr:addrArray[CurrentAddrIndex]['elecAddr'],currentDataSource:addrArray[CurrentAddrIndex]['数据来源'],RecordMan:addrArray[CurrentAddrIndex]['RecordMan'],RecordTime:addrArray[CurrentAddrIndex]['RecordTime']}) 
               

            addrArray.map(               
               (addrInfo)=>{                        
               return (
                 <TouchableOpacity key={addrInfo.BaiduLongitude}
                 onPress={()=>this.ShowAssetMap(addrInfo.BaiduLongitude,addrInfo.BaiduLatitude)}>
                 <View  style={{flexDirection:"row",backgroundColor:"white",marginBottom:2}}>                 
                      <View style={{width:w*0.9,}}>
                          <Text style={{fontSize: 15,marginBottom:5,lineHeight:25}}>
                          数据来源：{addrInfo.数据来源}{'\n'}
                          GPS上传人员：{addrInfo.RecordMan}{'\n'}
                          GPS上传时间：{addrInfo.RecordTime}{'\n'}
                          经纬度：{addrInfo.BaiduLongitude},{addrInfo.BaiduLatitude} </Text> 
                      </View>
                      <View style={{width:w*0.1,marginRight:0,justifyContent: 'center',}}>
                          <Text style={{marginRight:2,fontSize:20,textAlign:'center'}}>&gt;</Text>
                      </View>
                  
                  </View>
                  </TouchableOpacity>
               )
               } )
         
}
  </View>
      </ScrollView>
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



 