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

var TextFirstColor = ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"]

export default class boxConsRelate extends Component {
constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        boxAssetNo:"",
        InsertSerial:"",
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        boxTpis:"",
        
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
             this.setState({dataSource:this.state.dataSource.cloneWithRows(data['JustInsertRecord'])}) 
      
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
    //TextFirstColor[rowID]='black';
    this.setState({boxTpis:""})
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
          onChangeText={(text) =>   this.setState({boxTpis:text})  }
          />
      <Text>箱户关系核对</Text>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionID,rowID) =>             
            <View>
              <Text style={{color:TextFirstColor[0]}} > 
                  表号:{rowData.AssetInfo}{'\n'}
                  地址:{rowData.elecAddr}{'\n'}     
              </Text>
              <Button
                  style={{width:200}}
                  onPress={()=>this.confirmConsBoxRelate(rowID,rowData.AssetInfo,this.state.boxAssetNo)}
                  title="确认"
                  color="#00FF00"
                /> 
            </View>       
            }           
      />
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