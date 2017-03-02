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
      watchID:"",
      lastPosition:"",
      Lastlatitude:"",
      Lastlongitude:"",
      Currentlatitude:"",
      Currentlongitude:"",
    };
 }

 GetAndUploadGps= () => {
   this.setState({relateCount:0,assetInfo:0,currentAddr:"",currentTgName:""}); 
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
          this.setState({Currentlatitude:initialPosition.coords.latitude})
          this.setState({Currentlongitude:initialPosition.coords.longitude})
          //上传的操作要放在这个获取gps的回调函数里面，才能保证获取gps成功后才上传。如果信号不好获取不到怎么办？该函数有超时回调函数（？？）
          let formData=new FormData();                 
          formData.append("longitude",this.state.Currentlongitude);
          formData.append("latitude",this.state.Currentlatitude);
          formData.append("RecordTime",getNowFormatDate());
          formData.append("AssetInfo",this.state.AssetInfo);
          let url="http://1.loactionapp.applinzi.com/upload";
          fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data => {
            this.setState({relateCount:data['boxRelateCount']+data['addrRelateCount']});  
            this.setState({uploadResult:data['uploadResult']})
            this.setState({currentAddr:data['addr']})
            this.setState({currentTgName:data['currentTgName']})            
          })
          .catch(e => this.setState({uploadResult:e}));                     

      },
      (error) => console.error(error)
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
      this.setState({Lastlatitude:lastPosition.coords.latitude})
      this.setState({Lastlongitude:lastPosition.coords.longitude})

    });
 
  }
   componentDidMount= () => {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) =>{ 
          this.setState({Currentlatitude:initialPosition.coords.latitude})
          this.setState({Currentlongitude:initialPosition.coords.longitude})},
      (error) => console.error(error)
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
      this.setState({Lastlatitude:lastPosition.coords.latitude})
      this.setState({Lastlongitude:lastPosition.coords.longitude})
    });
  }
  componentWillUnmount= () => {
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    return (
      <View  style={styles.container}>     
        <Text style={styles.textStyle}>LastGPS:{this.state.Lastlatitude},{this.state.Lastlongitude}{'\n'}
         CurrentGPS:{this.state.Currentlatitude},{this.state.Currentlongitude}</Text>
        <Text style={styles.textStyle}>请输入资产编码或者设备编号、设备名称等关键信息,然后点击上传按钮</Text>
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
    
    <Text style={styles.textStyle}>上传结果：{this.state.uploadResult}{'\n'}上传的设备信息为：{this.state.AssetInfo}{'\n'}
    关联设备数：{this.state.relateCount}{'\n'} 上传的经纬度为：{this.state.Currentlatitude}{'\n'}{this.state.Currentlongitude}{'\n'}
    你在“ {this.state.currentAddr} ”附近{'\n'}所在台区为：{this.state.currentTgName}</Text>

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
    backgroundColor: '#F5FCFF',
    marginBottom: 0,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    margin: 2,
    //padding:10,
    borderWidth:1,
  	borderRadius:5,
  },
  addrStyle:{
     color:'red',
  }
})