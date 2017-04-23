import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import ScanUpload from './ScanUpload';

var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高


//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}



export default class ScanUploadResult extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'ScanUploadResult',
      longitude:0,
      latitude:0,
      ScanedAssetNo:"",
      boxDisable:false,
    };
 }
 
 componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        this.setState({
            ScanedAssetNo: this.props.ScanedAssetNo
        });
        navigator.geolocation.getCurrentPosition(
            (initialPosition) => {
                   this.setState({longitude:initialPosition.coords.longitude});
                    this.setState({latitude:initialPosition.coords.latitude});
              },
             (error) => alert("获取GPS信息失败："+error)
    );
 }

componentWillUnmount= () => {
    navigator.geolocation.clearWatch(this.watchID);
  }


  UploadGps = () => {  //获取GPS地址
        let formData=new FormData();
        formData.append("longitude",this.state.longitude);
        formData.append("latitude",this.state.latitude);
        formData.append("RecordTime",getNowFormatDate());
        formData.append("AssetInfo",this.state.ScanedAssetNo);
        let url="http://1.loactionapp.applinzi.com/upload";
        fetch(url,{method:"POST",headers:{},body:formData});
        alert("上传成功");                                        //改进：上传成功，失败判断
        const { navigator } = this.props;
        if(navigator) {
            navigator.replace({
                name: 'ScanUpload',
                component: ScanUpload,
              });
        }
}


  render() {
    return (
     <View  style={styles.container} >   
         <View style={styles.header}> 
              <Text style={styles.headtitle}>扫描结果</Text> 
        </View>  
        <View style={styles.textViewStyle}>
              <Text style={styles.textStyle}>扫描到条形码：{this.state.ScanedAssetNo}{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
              <Text style={styles.textStyle}>当前位置GPS：{this.state.longitude},{this.state.latitude}{'\n'}</Text>
        </View>
        
        <View style={{marginTop:10,marginBottom:10,width:w*0.6}}>
                    <Button                
                        onPress={this.UploadGps}
                        title="上传"                
                        color="#ff9a00"    
                        disabled={this.state.boxDisable}                    
                        accessibilityLabel=""
                        />
           </View>

      </View>
    );
  }
};
const styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f4f6f6',
    marginBottom: 0,
  },
  BottonStyle:{
  justifyContent: 'center',
  alignItems:'stretch',
  marginLeft:w*0.25,
  marginRight:w*0.25,
  marginBottom:7,
  height:30,
  //width:w*0.8,
  backgroundColor:"#ff9a00",
  borderColor:"#ff9a00",
  borderWidth:1,	
  borderRadius:20,
  width:w*0.35
},
textViewStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    width:w,
    //alignItems: 'center',
    backgroundColor:"white",
    marginLeft:w*0.01,
    marginRight:w*0.01,
    marginBottom:1,
    marginTop:0,
    height:40,
    borderWidth:0,
    borderRadius:5,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    //padding:10,
    //borderWidth:1,
  	//borderRadius:5,
    //borderColor:"white"
},
    header: { 
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w
}, 
headtitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
})