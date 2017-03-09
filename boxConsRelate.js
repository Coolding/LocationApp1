import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Navigator,
  Text,
  ListView,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import UploadGps from './UploadGps';

var TextColorSet=["red","black","red","green","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"]
var dataBlob=[]

 for (var i = 0 ; i < 35 ; i++){
                 dataBlob[i]={}
                 dataBlob[i].color='red';
              }

export default class boxConsRelate extends Component {
constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:   (r1, r2) => {
                if (r1 !== r2) {
                    //alert("不相等=");
                    console.log(r1);
                    console.log(r2);
                } else {
                    console.log("相等=");
                    console.log(r1);
                    console.log(r2);
                }
                return r1 !== r2;
            }});
    this.state = {
        boxAssetNo:"",
        InsertSerial:"",
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        boxTpis:"",
        returnData:"",
        TextColorSet1: TextColorSet,
        AssetSerial:"",

    };
  }

   componentDidMount() {
        this.setState({
            boxAssetNo: this.props.boxAssetNo,
            InsertSerial:this.props.InsertSerial,
        });
          let formData=new FormData();                 
          formData.append("InsertSerial",this.props.InsertSerial);  
          formData.append("boxAssetNo",this.props.boxAssetNo);         
          let url="http://1.loactionapp.applinzi.com/boxConsRelateGet";
          fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data => {     
             this.setState({returnData:data['JustInsertRecord']})   
             //alert(data['JustInsertRecord'].length)
             this.setState({AssetSerial:''})   
             
              for (var i = 0 ; i < data['JustInsertRecord'].length ; i++){
                 dataBlob[i] = data['JustInsertRecord'][i];
                 dataBlob[i].color='red';
                 this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+data['JustInsertRecord'][i]['AssetInfo']+'  '+data['JustInsertRecord'][i]['elecAddr']+'\n'}) 
                 //alert(this.state.AssetSerial) 
              }
             this.setState({dataSource:this.state.dataSource.cloneWithRows(dataBlob)}) 
          })
          .catch(e => 
          {
            console.log("获取数据失败");
            this.setState({uploadResult:e})
          }
          );    
 }

//确认箱户关系正确
confirmConsBoxRelate=  function(rowID,AssetInfo,BoxAssetNo)   {  
    TextColorSet[rowID]='black';             
    this.setState({TextColorSet1:TextColorSet})
    dataBlob[rowID].color='black'
    alert(dataBlob[rowID].color)
    //this.setState({dataSource:this.state.dataSource.cloneWithRows(dataBlob)}) 
    
    let formData=new FormData();             
    formData.append("AssetInfo",AssetInfo);  
    formData.append("BoxAssetNo",BoxAssetNo);  
    formData.append("confirmContent","在这个表箱里")
    let url="http://1.loactionapp.applinzi.com/confirmConsBoxRelate";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))

}

  render() {
    return (
      <View  style={styles.container} > 
      <ScrollView> 

        <Text>插入序号{this.state.InsertSerial}</Text>
        
      <Text>表箱号：{this.state.boxAssetNo}</Text>
      <Text>表箱信息收集</Text>

      <Text>表箱信息：</Text>
      <TextInput
          style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({boxTpis:text})  }
          />
      <Text>箱户关系核对</Text>
     <Text>电表号为:{'\n'}{this.state.AssetSerial}</Text>
      </ScrollView> 
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