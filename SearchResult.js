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
import Search from './Search'; 
import AssetMapView from './AssetMapView'; 
import scanSearchResult from './scanSearchResult'; 


 //改进： 
//1.目前APP在搜索时，是从GpsInfo里面去查找有无相关GPS信息，但是这样的话如果GpsInfo里面还未有人上传，后续的操作“根据用电地址自动返回一个
//导航信息”就会失败，因为从数据库GpsInfo里面没有获取到用电地址
//2.nextAddr函数里面的操作：根据用电地址返回经纬度这一步可能遇到的问题有：
//百度API对于address字段可能会出现中文或其它一些特殊字符（如：空格），对于类似的字符要进行编码处理，编码成 UTF-8 字符的二字符十六进制值
//参考网址http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
 
//4.如果同一电表（设备）系统有很多个人上传的地址，是否限制只显示几个就可以了，显示太多反而让用户无从选择
//提示当前系统有多少电表，表箱……位置信息可供查询定位


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

//var    CurrentAddrIndex=0;
 var   addrArray=[];
  var   addrArray1=[];



export default class SearchResult extends Component {  
  
  constructor(props) {  
    super(props);  
     this.state = {
     toSearchAssetNo:"", 
     currentAssetNo:"",
     currentElecAddr:"获取中",
     currentDataSource:"",
     addrCount:" ........信息获取中，请稍候........",
    }; 
  }  
  


  componentWillMount() {
        //这里获取从Search传递过来的参数: SearchAssetNo
        
        addrArray=[]
        this.setState({currentAssetNo:''})
        this.setState({toSearchAssetNo: this.props.SearchAssetNo},function(){
            //查找SearchAssetNo在数据库里面是否已有人上传过的GPS地址
            let url="http://1.loactionapp.applinzi.com/GetGPSInfo/"+this.props.SearchAssetNo;
            fetch(url,{method:"GET"}).then(response => response.json())
            .then(data => {
                //没找到任何信息
                if(data[0]==0){
                    alert("不好意思，没找到该设备的信息")
                    addrArray=[];
                    this.setState({addrCount:0})
                    CurrentAddrIndex=0;
                }
                //有找到上传的GPS信息
                else if(data[0]==1){
                       //alert("找到了")
                        addrArray1=data[1];
                        this.setState({addrCount:data[1].length})
                        for (var i = 0 ; i < addrArray1.length ; i++){
                            addrArray[i]=addrArray1[i]
                            addrArray[i]['id']=i+1
                        }
                        this.setState({currentAssetNo:addrArray[0]['AssetInfo']})
                }
                //没有找到上传的GPS信息，但是consLow有相应信息，采用consLow里面的gps地址
                else if(data[0]==2){
                        //alert("找到了")
                        addrArray1=data[1];                        
                        this.setState({addrCount:data[1].length})                        
                        for (var i = 0 ; i < addrArray1.length ; i++){
                            addrArray[i]={}
                            addrArray[i]['数据来源']='上传（模糊定位）'
                            addrArray[i]['RecordMan']='集海分中心 王丁盛2'
                            addrArray[i]['RecordTime']='2017-1-1'
                            addrArray[i]['BaiduLongitude']=addrArray1[i]['BaiduLon']                            
                            addrArray[i]['BaiduLatitude']=addrArray1[i]['BaiduLat']
                            addrArray[i]['BarCode']=addrArray1[i]['BarCode']
                            addrArray[i]['AssetInfo']=addrArray1[i]['ASSET_NO']                     

                            addrArray[i]['id']=i+1
                        }
                        this.setState({currentAssetNo:addrArray1[0]['ASSET_NO']})
                }

                      })  
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

ReturnToSearch=()=>{
     const { navigator } = this.props;
    //  navigator.replace({
    //     name: 'Search',
    //     component: Search,
    //     });
    navigator.pop()
 }

getDistanceFromXtoY=(lat_a,lng_a,lat_b,lng_b)=>{
    let pk = 180 / 3.14169
    let a1 = float(lat_a)/pk
    let a2 = float(lng_a)/pk
    let b1 = float(lat_b)/pk
    let b2 = float(lng_b)/pk
    let t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2)
    let t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2)
    let t3 = Math.sin(a1) * Math.sin(b1)
    let tt = Math.acos(t1 + t2 + t3)
    console.log(float(6366000 * tt))
    return float(6366000 * tt)
}

//点击某一条查找结果时，根据其对应的经纬度，直接打开地图网页链接（调用手机的浏览器打开）
openBaiduMap=(lng,lat)=>{
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
            let openurl="http://api.map.baidu.com/geoconv/v1/?coords="+initialPosition.coords.longitude+','+initialPosition.coords.latitude+"&from=1&to=5&ak=hAYszgjy50mrlSDBIusNfSc4"
            fetch(openurl,{method:"GET"}).then(response => response.json())
                .then(data => {
                        let BaiduGPS=data['result'][0] 
                        let BaiduGPSLng=BaiduGPS['x']
                        let BaiduGPSLat=BaiduGPS['y']
                         var url = 'http://api.map.baidu.com/direction?origin=' + BaiduGPSLat+','+BaiduGPSLng + '&destination='+lat+','+lng+'&mode=driving&region=厦门&output=html'
                            Linking.openURL(url)  
                            .catch((err)=>{  
                            console.log('An error occurred', err);  
                            });
                }) 

      })

}

 

  render() {  
    return (  
      <View style={styles.container}>  
       <View style={styles.header}> 
            <TouchableOpacity   
                style={{alignSelf:'center',}}            
                onPress={this.ReturnToSearch}>
                <Text style={styles.leftitle}>返回</Text> 
            </TouchableOpacity>
           <Text style={styles.headtitle}>查找结果</Text> 
      </View>  
      <ScrollView>
           
       
          <View style={{width:w,backgroundColor:'white',justifyContent: 'center',marginBottom:5,height:40}}>
              <Text style={{fontSize: 17}}>一共查找到{this.state.addrCount}个关于{this.state.toSearchAssetNo}的定位信息{'\n'}
              </Text>      
          </View>
            <View>
        {  
              addrArray.map(               
               (addrInfo)=>{                        
               return (
                 <TouchableOpacity key={addrInfo.id}
                 onPress={()=>this.openBaiduMap(addrInfo.BaiduLongitude,addrInfo.BaiduLatitude)}>
                 <View  style={{flexDirection:"row",backgroundColor:"white",marginBottom:2}}>                 
                      <View style={{width:w*0.9,}}>
                          <Text style={{fontSize: 15,marginBottom:5,lineHeight:25}}>
                          第{addrInfo.id}条查找结果：{'\n'}
                          AssetInfo：{addrInfo.AssetInfo}{'\n'}
                          BarCode：{addrInfo.BarCode}{'\n'}
                          数据来源：{addrInfo.数据来源}{'\n'}
                          GPS上传人员：{addrInfo.RecordMan}{'\n'}
                          GPS上传时间：{addrInfo.RecordTime}{'\n'}
                          经纬度：{addrInfo.BaiduLongitude.slice(0,10)},{addrInfo.BaiduLatitude.slice(0,10)}                        
                          </Text> 
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
  <View style={{marginTop:30,marginBottom:10,marginLeft:10}}> 
        <Text style={{fontSize:18,color:'#1DBAF1'}}
               onPress={()=>alert("点击上面的定位信息--打开的页面拉到最下方--点击导航（要先安装百度地图APP，注意不要使用其他地图）")}>导航使用帮助?</Text> 
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
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'flex-start', 
    width:w
}, 
leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
headtitle: { 
    marginLeft:90,
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
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



 