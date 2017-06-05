import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Navigator,
  Text,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import scanSearchResult from './scanSearchResult';
import Search from './Search';
var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: w*0.6,
        width: w*0.6,
        marginBottom:0,
        marginLeft:0,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent'
    },
});

export default class ScanSearch extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
 
    };

   
  }

 
//扫描到条形码
  onBarCodeRead=(e)=>{
    
    let b=[]
    a=e.data
    
    a=a.replace(","," ")
    a=a.replace("."," ")
    a=a.replace("/"," ")
    a=a.replace(""," ")
    a=a.replace("，"," ")
    a=a.replace(";"," ")
    //a=a.replace("\\n"," ")
    //a=a.replace("\\r"," ")
    a=a.replace(/\r\n/g," ")
    //a=a.replace(/\n/g," ")
    //alert(a)
    while(a.indexOf("  ")>=0)
      a=a.replace("  "," ")  

    a=a.replace(/(^\s*)|(\s*$)/g, ""); //去除左右两边的空格   
     
    
    b=a.split(" ")
    this.saveToSearchHistory(a)
  
       
    
  const { navigator } = this.props;
    navigator.replace({
    name: 'scanSearchResult',
    component: scanSearchResult,
    params: {
    AllScanedAssetNo: b
    }});
    
   
}

saveToSearchHistory=(searchString)=>{
       
      let SearchHistory='';
      let SearchHistoryArray=[];
      AsyncStorage.getItem('SearchHistory').then((value) => { 
                 SearchHistoryArray=[];
                 SearchHistory=value  
                 if(SearchHistory==null) {
                   SearchHistoryArray[0]=searchString   //搜索历史为空
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
                                  SearchHistoryArray[0]=searchString;
                                  //alert(SearchHistoryArray)
                                  SearchHistory=''        //将查询记录数组重新转化为字符串并存储
                                  for (let i=0; i<SearchHistoryArray.length; i++) {  
                                    if(i==SearchHistoryArray.length-1)
                                        SearchHistory= SearchHistory+SearchHistoryArray[i]
                                    else
                                        SearchHistory= SearchHistory+SearchHistoryArray[i]+','     
                                      }
                                  AsyncStorage.setItem('SearchHistory',SearchHistory)
                                    
                        }) 
                                
                 }
      })

}


 gotoSearch=() =>{
    const { navigator } = this.props;
    // navigator.replace({
    //             name: 'Search',
    //             component: Search,
    //           params: {
    //           }});
    navigator.pop()
    
}




  render() {

    return (
      <View style={styles.container}>
          <View style={styles.header}> 
            <TouchableOpacity   
                style={{alignSelf:'center',}}            
                onPress={this.gotoSearch}>
                <Text style={styles.leftitle}>返回</Text> 
            </TouchableOpacity>
            <Text style={styles.headtitle}>扫描搜索</Text> 
           </View> 
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead} >
          <View style={styles.rectangleContainer}>               
               <View style={styles.rectangle} />
          </View>
        </Camera>
    
    </View>
    );
  }
}
