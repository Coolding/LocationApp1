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
      ScanedAssetNo:""
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
      (error) => console.error(error)
    );
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
      <View style={{flex:1,backgroundColor:'#eee',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'#f00'}}>扫描到条形码：{this.state.ScanedAssetNo}</Text>
          <Text style={{fontSize:20,color:'#f00'}}>当前位置GPS：{this.state.longitude},{this.state.latitude}</Text>
          <Button
        onPress={this.UploadGps}
        title="上传"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 100,
  },
  textStyle:{
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  }
})