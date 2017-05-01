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
     toSearchAssetNo:"",
    }; 
  }  
  
 


  //点击查找之后，跳转到信息和地图显示页面
 ShowMap=()=>{      
     var SearchHistory:'';
     var SearchHistoryArray:[];
     
     try {
          AsyncStorage.getItem('SearchHistory').then((value) => { 
                 SearchHistoryArray=[];
                 SearchHistory=value  
                 if(SearchHistory==null) {
                   SearchHistoryArray[0]=this.state.toSearchAssetNo   //搜索历史为空
                  // alert(SearchHistoryArray)
                 }
                 else {               //搜索历史非空，之前已有搜索过
                      SearchHistoryArray=SearchHistory.split(",");
                      AsyncStorage.getItem('SearchHistoryCount').then((SearchHistoryCount) => {
                        if(SearchHistoryCount>SearchHistoryArray.length)
                            SearchHistoryCount=SearchHistoryArray.length+1
                        for (let i=SearchHistoryCount-1; i>=1; i--) {  
                              SearchHistoryArray[i]= SearchHistoryArray[i-1]            
                             }
                        SearchHistoryArray[0]=this.state.toSearchAssetNo;
                        //alert(SearchHistoryArray)
                        SearchHistory=''
                        for (let i=0; i<SearchHistoryArray.length; i++) {  
                          if(i==SearchHistoryArray.length-1)
                              SearchHistory= SearchHistory+SearchHistoryArray[i]
                          else
                              SearchHistory= SearchHistory+SearchHistoryArray[i]+','     
                             }
                        // while(SearchHistory.lastIndexOf(",")==0)  //去除右边,
                        //       SearchHistory=SearchHistory.slice(0,SearchHistory.length-2)  //去除最后的，
                         alert(SearchHistory)
                        AsyncStorage.setItem('SearchHistory',SearchHistory) 
                        
                      })
                 }
                     
           });
         
    }
  catch (error){
          alert('失败：'+error);
   }


     
    
    
 
       
    //  for (let i=SearchArrayCount; i>=2; i--) {
    //       AsyncStorage.getItem('Search'+(i-1)).then((value) => AsyncStorage.setItem('Search'+i,value) )            
    //   }
    //   AsyncStorage.setItem('Search1',this.state.toSearchAssetNo)
    //   //AsyncStorage.getItem('Search5').then((value) =>alert(value))   
    //  // alert(SearchArrayCount)
    //   for (let i=1; i<=5; i++) {
    //    // alert(SearchArrayCount)
    //       AsyncStorage.getItem('Search'+i).then((value) => storageResult=storageResult+value+',')     
    //      // if(i==1) alert(storageResult)
    //   }
    //    // alert(storageResult)

    //  const { navigator } = this.props;
    //  navigator.replace({
    //     name: 'SearchResult',
    //     component: SearchResult,
    //     params: {
    //     SearchAssetNo: this.state.toSearchAssetNo
    //     }});
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
       
      <View style={styles.header}> 
        <Text style={styles.headtitle}>查找和定位</Text> 
    </View>      
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



 