import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Image
} from 'react-native';



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
      longitude:0,
      latitude:0,
      AssetInfo:"",
    };
 }
 componentDidMount= () => {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
          this.setState({longitude:initialPosition.coords.longitude});
          this.setState({latitude:initialPosition.coords.latitude});
      },
      (error) => console.error(error)
    );
    // this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
    //   this.setState({lastPosition});
    // });
 
  }

 UploadGps = () => {  //获取GPS地址
//    navigator.geolocation.getCurrentPosition(
//       (initialPosition) => {
//         alert(initialPosition.coords.latitude);
//         let formData=new FormData();
//         formData.append("longitude",initialPosition.coords.longitude);
//         formData.append("latitude",initialPosition.coords.latitude);
//         formData.append("RecordTime",getNowFormatDate());
//         let url="http://1.loactionapp.applinzi.com/upload";
//         fetch(url,{method:"POST",headers:{},body:formData});
//       },
//       (error) => alert(error)
//     );
        let formData=new FormData();
        formData.append("longitude",this.state.longitude);
        formData.append("latitude",this.state.latitude);
        formData.append("RecordTime",getNowFormatDate());
        formData.append("AssetInfo",this.state.AssetInfo);
        let url="http://1.loactionapp.applinzi.com/upload";
        fetch(url,{method:"POST",headers:{},body:formData});
        alert("上传成功");                                        //改进：上传成功，失败判断
}

  render() {
    return (
      <View  style={styles.container}>        
        <Text style={styles.textStyle}>当前位置GPS：{this.state.longitude},{this.state.latitude}</Text>
        <Text style={styles.textStyle}>请输入资产编码或者设备编号等关键信息,然后点击上传按钮</Text>
        <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({AssetInfo:text})}
        //value={this.state.text}
        />
      <Button
        onPress={this.UploadGps}
        title="上传"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
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
    marginBottom: 100,
  },
  textStyle:{
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  }
})