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
  AsyncStorage,
  Math,
  BackAndroid,
  ScrollView,
  TouchableOpacity
} from 'react-native'; 
import SearchResult from './SearchResult'; 
import ScanSearch from './ScanSearch'; 
import scanSearchResult from './scanSearchResult'; 


  
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
 
 
  
var url='http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html';
 

export default class Search extends Component {  
  
  constructor(props) {  
    super(props); 
     this.state = {
     toSearchAssetNo:"",
     SearchHistoryDetail:"",
    }; 
  }  

   onBackAndroid = () => {
    const { navigator } = this.props;
    const routers = navigator.getCurrentRoutes();
     
    if (routers.length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  };
 

 
  
 componentWillMount() {
    //安卓返回键监听事件   
  BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
   AsyncStorage.getItem('SearchHistory').then((SearchHistory) => {
      this.setState({SearchHistoryDetail:SearchHistory})
   })
   

 }
refresh=()=>{
    AsyncStorage.getItem('SearchHistory').then((SearchHistory) => {
      this.setState({SearchHistoryDetail:SearchHistory})
   })

}

  //点击查找之后，存储查找结果，并跳转到信息和地图显示页面
 ShowMap=()=>{      
     var SearchHistory='';
     var SearchHistoryArray=[];
     //如果是扫描（查询结果是数组）查询，怎么整？？？？？？？？？？？？？？
     try {
          AsyncStorage.getItem('SearchHistory').then((value) => { 
                 SearchHistoryArray=[];
                 SearchHistory=value  
                 if(SearchHistory==null) {
                   SearchHistoryArray[0]=this.state.toSearchAssetNo   //搜索历史为空
                  // alert(SearchHistoryArray)
                 }
                 else {               //搜索历史非空，之前已有搜索过
                     //注意，AsyncStorage只能存储字符串！
                      SearchHistoryArray=SearchHistory.split(",");  //字符串先变为数组
                      AsyncStorage.getItem('SearchHistoryCount').then((SearchHistoryCount) => {
                                  if(SearchHistoryCount>SearchHistoryArray.length)
                                      SearchHistoryCount=SearchHistoryArray.length+1
                                  for (let i=SearchHistoryCount-1; i>=1; i--) {      //查询历史逐个向后移动，将最新的查询记录存放在第一个位置
                                        SearchHistoryArray[i]= SearchHistoryArray[i-1]            
                                      }
                                  SearchHistoryArray[0]=this.state.toSearchAssetNo;
                                  //alert(SearchHistoryArray)
                                  SearchHistory=''        //将查询记录数组重新转化为字符串并存储
                                  for (let i=0; i<SearchHistoryArray.length; i++) {  
                                    if(i==SearchHistoryArray.length-1)
                                        SearchHistory= SearchHistory+SearchHistoryArray[i]
                                    else
                                        SearchHistory= SearchHistory+SearchHistoryArray[i]+','     
                                      }
                                  AsyncStorage.setItem('SearchHistory',SearchHistory,()=>{
                                          this.setState({SearchHistoryDetail:SearchHistory}, function () {
                                          const { navigator } = this.props;
                                          navigator.push({
                                          name: 'SearchResult',
                                          component: SearchResult,
                                          params: {
                                          SearchAssetNo: this.state.toSearchAssetNo
                                          }});  
                                          });
                                  }) 
                        
                                })
                 }

                
             
             
           });
         
    }
  catch (error){
          alert('失败：'+error);
   }

 
     

    
      // <View>
      //  {              
      //       this.state.sBoxConsRelateConfirm.map(               
      //          (RelateConfirm)=>{              
      //          return (
      //            <View key={RelateConfirm.id} style={{backgroundColor:"white",marginBottom:2}}>
      //                 <Text style={{fontSize: 15,marginBottom:5,}}>({RelateConfirm.id})表号：{RelateConfirm.AssetNo}{'\n'}   地址：{RelateConfirm.elecAddr}  {RelateConfirm.Confirm}</Text>
                     
      //            </View>
      //          )
      //          //
      //          } )         
      //  }
      //  </View>
 }

//跳转到扫描（电能表二维码）批量定位页面
 gotoScanSearch=()=>{
     const { navigator } = this.props;
     navigator.push({
        name: 'ScanSearch',
        component: ScanSearch,
        });
 }

//点击查询历史的时候，跳到相应的页面
gotoSearchResult=(SearchHistory)=>{
   let SearchHistoryArray=SearchHistory.split(" ")
    const { navigator } = this.props;
   if(SearchHistoryArray.length==1){           
       navigator.push({
          name: 'SearchResult',
          component: SearchResult,
          params: {
          SearchAssetNo: SearchHistoryArray[0]
          }});  
   }
   else{
     navigator.push({
          name: 'scanSearchResult',
          component: scanSearchResult,
        params: {
          AllScanedAssetNo: SearchHistoryArray
        }});
   }


}


  render() {  
    return (  
      <View style={styles.container}>  
       
      <View style={styles.header}> 
        <Text style={styles.headtitle}>查找和定位</Text> 
    </View>      
            <View style={{backgroundColor:'white',borderRadius:5,marginBottom:10}}>
            
            <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
                <TextInput
                style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                underlineColorAndroid="transparent"
                placeholder="输入要查找和导航的表(箱)号，户号等"
                selectTextOnFocus={true}
                clearTextOnFocus={true}
                onChangeText={(text) =>   this.setState({toSearchAssetNo:text})  }
                  />
                <View style={{marginLeft:w*0.02,marginBottom:10,height:45,width:w*0.15}}>
                    <Button           
                        onPress={this.ShowMap}
                        title="查找"                
                        color="#ff9a00"                        
                        accessibilityLabel=""
                        />
                </View>
            </View>
            <View style={{marginLeft:w*0.2,marginBottom:10,width:w*0.6}}>
                    <Button          
                        onPress={this.gotoScanSearch}
                        title="扫描二维码批量定位"                
                        color="#ff9a00"                        
                        accessibilityLabel=""
                        />
           </View>
         </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-start',marginLeft:5,width:w,alignItems: 'center',}}>
         <Text style={{fontSize: 18,marginBottom:5,marginLeft:5,marginRight:w*0.3,}}>最近查询记录</Text>
          <Button       style={{marginTop:0}} 
                        onPress={this.refresh}
                        title="刷新查询记录"                
                        color="#ff9a00"                        
                        accessibilityLabel=""
                        />
          </View>
            <View  style={{marginTop:5}} ></View>
         <ScrollView>
         <View>
         {
           this.state.SearchHistoryDetail.split(",").map(
                (SearchHistory,index)=>{                        
               return (
                 <TouchableOpacity key={index}  onPress={()=>this.gotoSearchResult(SearchHistory)}>
                 <View style={{width:w,marginBottom:2,backgroundColor:"white"}}>
                          <Text style={{fontSize: 15,marginBottom:5,lineHeight:30}}>
                           （{index+1}）{SearchHistory.split(" ")[0]}等{SearchHistory.split(" ").length}个{'\n'}             
                          </Text> 
                  </View>
                  </TouchableOpacity>
               )
                }
           )
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
    alignItems: 'center',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
    header: { 
    height: 40, 
    width:w,
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
}, 
headtitle: { 
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



 