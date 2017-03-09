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
  ScrollView,
  ListView,
} from 'react-native';
import boxConsRelate from './boxConsRelate';

 var  BoxConsRelateConfirm=[], 
      AssetArray=[], 
      elecAddrArray=[];
 

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
      boxRelateCount:"",
      addrRelateCount:"",
      boxAssetNo:"",
      InsertSerial:0,
      AssetSerial:"",  //用于显示、核对箱户关系
      currentComfirmIndex:0,

    };
 }

// boxConsRelateCheck= () =>{
//   const { navigator } = this.props;
//   navigator.replace({
//       name: 'boxConsRelate',
//       component: boxConsRelate,
//       params: {
//         boxAssetNo:this.state.boxAssetNo,
//         InsertSerial:this.state.InsertSerial,
//       }});
// }

//表计在这个表箱里
confirmOk= () =>{
    let tmpText=''  
    BoxConsRelateConfirm[this.state.currentComfirmIndex]="在这个表箱里面";
    for (var i = 0 ; i < this.state.JustInsertRecord.length ; i++){
              // this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'}) 
            tmpText=tmpText+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'
          }
    this.setState({AssetSerial:tmpText})
    this.setState({currentComfirmIndex:this.state.currentComfirmIndex+1})
 }

//表计不在这个表箱
confirmNo =() =>{
    let tmpText=''  
    BoxConsRelateConfirm[this.state.currentComfirmIndex]="不属于该表箱";
    for (var i = 0 ; i < this.state.JustInsertRecord.length ; i++){
              // this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'}) 
            tmpText=tmpText+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'
          }
    this.setState({AssetSerial:tmpText})
    this.setState({currentComfirmIndex:this.state.currentComfirmIndex+1})
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
            this.setState({boxRelateCount:data['boxRelateCount']});  
            this.setState({addrRelateCount:data['addrRelateCount']});  
            this.setState({uploadResult:data['uploadResult']})
            this.setState({currentAddr:data['addr']})
            this.setState({currentTgName:data['currentTgName']})  
            this.setState({boxAssetNo:data['boxAssetNo']}) 
            this.setState({InsertSerial:data['InsertSerial']}) 
            this.setState({JustInsertRecord:data['JustInsertRecord']})     
            //获取刚刚插入的记录（用于核对箱户关系）     
            this.setState({AssetSerial:""})  
            this.setState({currentComfirmIndex:0})   
            BoxConsRelateConfirm=[]; 
            AssetArray=[];
            elecAddrArray=[]
            for (var i = 0 ; i < data['JustInsertRecord'].length ; i++){
                 BoxConsRelateConfirm[i]="未确认"
                 AssetArray[i]=data['JustInsertRecord'][i]['AssetInfo']
                 elecAddrArray[i]=data['JustInsertRecord'][i]['elecAddr']
                 this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'}) 
              }
            
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
      
      <View  style={styles.container} >    
      <ScrollView> 
        <Text style={styles.textStyle}>LastGPS:{this.state.Lastlatitude},{this.state.Lastlongitude}{'\n'}
         CurrentGPS:{this.state.Currentlatitude},{this.state.Currentlongitude}</Text>
        <Text style={styles.textStyle}>请输入资产编码或者设备编号、设备名称等关键信息,然后点击上传按钮</Text>
        <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) =>   this.setState({AssetInfo:text})  }
         />
      <Button
        onPress={this.GetAndUploadGps}
        title="上传"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
    
    <Text style={styles.textStyle}>上传结果：{this.state.uploadResult}{'\n'}
        这是系统收到的第{this.state.InsertSerial}个GPS信息{'\n'}
        上传的设备信息为：{this.state.AssetInfo}{'\n'}
        当前表箱关联设备数：{this.state.boxRelateCount}{'\n'}
        当前地址关联设备数：{this.state.addrRelateCount}{'\n'} 
        上传的经纬度为：{this.state.Currentlatitude},{this.state.Currentlongitude}{'\n'}
        你在“ {this.state.currentAddr} ”附近{'\n'}
        所在台区为：{this.state.currentTgName}{'\n'}
        当前表箱号:{this.state.boxAssetNo}{'\n'}
        不对，电能表所在表箱号应该是：</Text>
        <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
       // onChangeText={(text) =>   this.setState({AssetInfo:text})  }
         />
         <Text style={styles.textStyle}>  {AssetArray[this.state.currentComfirmIndex]} </Text>
         <Button
        onPress={this.confirmOk}
        title="在表箱里"
        color="#841584"
        accessibilityLabel=""
        />
         <Button
        onPress={this.confirmNo}
        title="不在这个表箱里面"
        color="#841584"
        accessibilityLabel=""
        />
        <Text style={styles.textStyle}>箱户对应关系：{'\n'}{this.state.AssetSerial}{'\n'}</Text>
       
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