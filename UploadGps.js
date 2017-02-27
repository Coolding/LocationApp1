import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Image,
  Picker,
} from 'react-native';

//改进：上传后自动清空输入的设备信息
//获取GPS时没权限？信号不好半天获取不到时会不会用了上个的经纬度或者用0？
var latitude,longitude

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




export default class UploadGps extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'UploadGps',
      AssetInfo:"",
      relateCount:0,
      assetInput:"",    //设备信息输入框的值
      uploadResult:"",
      currentAddr:"",
      currentTgName:"",
    };
 }

 GetAndUploadGps= () => {
   this.setState({relateCount:0,assetInfo:0,currentAddr:""}); 
   latitude=0
   longitude=0
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
          latitude=initialPosition.coords.latitude
          longitude=initialPosition.coords.longitude
          //上传的操作要放在这个获取gps的回调函数里面，才能保证获取gps成功后才上传。如果信号不好获取不到怎么办？该函数有超时回调函数（？？）
          let formData=new FormData();                 
          formData.append("longitude",longitude);
          formData.append("latitude",latitude);
          formData.append("RecordTime",getNowFormatDate());
          formData.append("AssetInfo",this.state.AssetInfo);
          let url="http://1.loactionapp.applinzi.com/upload";
          fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data => {
            this.setState({relateCount:data['boxRelateCount']+data['addrRelateCount']});  
            this.setState({uploadResult:"成功"})
            this.setState({currentAddr:data['addr']})
            this.setState({currentTgName:data['currentTgName']})            
          })
          .catch(e => this.setState({uploadResult:e}));                     

      },
      (error) => console.error(error)
    );
    // this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
    //   this.setState({lastPosition});
    // });
 
  }

 
  render() {
    return (
      <View  style={styles.container}>        
        <Text style={styles.textStyle}>请输入资产编码或者设备编号等关键信息,然后点击上传按钮</Text>
        <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) =>   this.setState({AssetInfo:text})  }
        //onFocus={()=>clear()}     //写法不对？？？
        //onEndEditing={clear()}   //写法不对？？？
         />
      <Button
        onPress={this.GetAndUploadGps}
        title="上传"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
    <Text style={styles.textStyle}>上传结果：{this.state.uploadResult}</Text>
    <Text style={styles.textStyle}>上传的设备信息为：{this.state.AssetInfo}</Text>
    <Text style={styles.textStyle}>关联设备数：{this.state.relateCount}</Text>
    <Text style={styles.textStyle}>上传的经度为：{longitude}、
                                   上传的纬度为：{latitude}</Text>
    <Text style={styles.textStyle,styles.addrStyle}>你在“ {this.state.currentAddr} ”附近</Text>
    <Text style={styles.textStyle}>所在台区为：{this.state.currentTgName}</Text>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 0,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    padding:10,
  },
  addrStyle:{
     color:'red',
  }
})