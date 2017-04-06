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
import SearchResult from './SearchResult'; 



 


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var b=""
var a=[]

 


export default class scanSearchResult extends Component {  
  
  constructor(props) {  
    super(props);  
     this.state = {
         AllScanedAssetNo:"",
         AssetNoArray:[],
 
    }; 
  }  
  


  componentWillMount() {
        //这里获取从Search传递过来的参数: SearchAssetNo
        this.setState({AllScanedAssetNo: this.props.AllScanedAssetNo},function(){  
              let i=0
              while(i<this.state.AllScanedAssetNo.length){                 
                a[i]={}
                a[i]['index']=i
                a[i]['assetNo']=this.state.AllScanedAssetNo[i]                 
                i=i+1
              }
              this.setState({AssetNoArray:a})
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

 
  //点击某一架表后，跳转到其对应的信息和地图显示页面
 ShowMap=(assetNo)=>{
     const { navigator } = this.props;
     navigator.replace({
        name: 'SearchResult',
        component: SearchResult,
        params: {
        SearchAssetNo: assetNo
        }});
 }

 
  render() {  
    return (  
      <View style={styles.container}>  
      <View  style={{height:40,width:w,backgroundColor:'#ff9a00',justifyContent: 'center',marginBottom:1}} ><Text style={{fontSize:20,textAlign:'center'}}>查找结果</Text></View>
       <View>{

         this.state.AssetNoArray.map(               
               (assetNoArray)=>{                        
               return (
                 <TouchableOpacity key={assetNoArray.index}
                 onPress={()=>this.ShowMap(assetNoArray.assetNo)}>
                 <View  style={{flexDirection:"row",backgroundColor:"white",marginBottom:2}}>                 
                      <View style={{width:w*0.9,}}>
                          <Text style={{fontSize: 15,marginBottom:5,lineHeight:25}}>
                          {assetNoArray.assetNo}</Text> 
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



 