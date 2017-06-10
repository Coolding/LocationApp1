import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Picker,
  ScrollView,
  ListView,
  AsyncStorage,
} from 'react-native';
import boxConsRelate from './boxConsRelate';
import ScanUpload from './ScanUpload';

var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
 var  BoxConsRelateConfirm=[];
  var currentLoginUserName='';
 

 

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
      uploadResult:"",
      currentAddr:"",
      // watchID:"",
      // lastPosition:"",
      // Lastlatitude:"",
      // Lastlongitude:"",
      Currentlatitude:"",
      Currentlongitude:"",
      boxRelateCount:"",
      addrRelateCount:"",
      boxIndex:"",
      InsertSerial:0,
      AssetSerial:"",  //用于显示、核对箱户关系
      currentComfirmIndex:0,
      factboxIndex:'',  //现场实际的表箱号
      boxDisable:true,
      sBoxConsRelateConfirm:[],
      AsyncStorage,
    };
 }

 

//表计在这个表箱里
confirmOk= (i) =>{
  //   let tmpText=''  
  //   BoxConsRelateConfirm[this.state.currentComfirmIndex]="在这个表箱里面";
  //   for (var i = 0 ; i < this.state.JustInsertRecord.length ; i++){
  //             // this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'}) 
  //           tmpText=tmpText+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'
  //         }

            BoxConsRelateConfirm[i]['Confirm']="在表箱里"
            this.setState({sBoxConsRelateConfirm:BoxConsRelateConfirm})

 
            let formData=new FormData();             
            formData.append("AssetInfo",BoxConsRelateConfirm[i]['AssetNo']);  
            formData.append("boxIndex",this.state.boxIndex);  
            formData.append("confirmContent","在这个表箱里")
            let url="http://1.loactionapp.applinzi.com/confirmConsBoxRelate";
            fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
            .then(data => console.log(data))
          .catch(e => console.log("Oops, error", e))
 
 }

//表计不在这个表箱
confirmNo =(i) =>{
  //   let tmpText=''  
  //   BoxConsRelateConfirm[this.state.currentComfirmIndex]="不属于该表箱";
  //   for (var i = 0 ; i < this.state.JustInsertRecord.length ; i++){
  //             // this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'}) 
  //           tmpText=tmpText+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'
  //         }
 
  //   this.setState({AssetSerial:tmpText})
  //   this.setState({currentComfirmIndex:this.state.currentComfirmIndex+1})
            BoxConsRelateConfirm[i]['Confirm']="不在表箱里"
            this.setState({sBoxConsRelateConfirm:BoxConsRelateConfirm})
            let formData=new FormData();             
            formData.append("AssetInfo",BoxConsRelateConfirm[i]['AssetNo']);  
            formData.append("boxIndex",this.state.boxIndex);  
            formData.append("confirmContent","不在这个表箱里")
            let url="http://1.loactionapp.applinzi.com/confirmConsBoxRelate";
            fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
            .then(data => console.log(data))
          .catch(e => console.log("Oops, error", e))
 }

//所属表箱号不正确，上传现场的表箱号
confirmboxIndex =() =>{

  let formData=new FormData();             
    formData.append("AssetInfo",this.state.AssetInfo);  
    formData.append("boxIndex",this.state.factboxIndex);  
    formData.append("confirmContent","在这个表箱里")
    let url="http://1.loactionapp.applinzi.com/confirmConsBoxRelate";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
    .then(data => alert("上传表箱号成功"))
   .catch(e => console.log("Oops, error", e))
}



componentDidMount() {
        //这里获取从ScanUpload传递过来的参数: ScanedAssetNo(即扫描的的条形码号码)
        this.setState({AssetInfo: this.props.ScanedAssetNo });
        currentLoginUserName=this.props.currentLoginUserName 
        this.setState({Currentlatitude:""})
        this.setState({Currentlongitude:""})
        this.setState({relateCount:0,currentAddr:""}); 

   
   
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
          formData.append("RecordMan",currentLoginUserName);
          formData.append("tips",'');
          
          let url="http://1.loactionapp.applinzi.com/upload";
          fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data => {
                        this.setState({boxDisable:true})
                        this.setState({boxRelateCount:data['boxRelateCount']});  
                        this.setState({addrRelateCount:data['addrRelateCount']});  
                        this.setState({uploadResult:data['uploadResult']})
                        this.setState({currentAddr:data['addr']})
                        this.setState({InsertSerial:data['InsertSerial']}) 
                        //下面几行是用于箱户核对的，先屏蔽！！！！！！！!!!!!!
                        // this.setState({boxIndex:data['boxIndex']})                         
                        // this.setState({JustInsertRecord:data['JustInsertRecord']})     
                        // 
                        // //获取刚刚插入的记录（用于核对箱户关系）     
                        // this.setState({AssetSerial:""})  
                        // this.setState({currentComfirmIndex:0})   
                        // BoxConsRelateConfirm=[]; 
                        // //AssetArray=[];
                        // //elecAddrArray=[]
                        // for (var i = 0 ; i < data['JustInsertRecord'].length ; i++){
                        //     BoxConsRelateConfirm[i]={}
                        //     BoxConsRelateConfirm[i]['Confirm']="未确认"
                        //     BoxConsRelateConfirm[i]['AssetNo']=data['JustInsertRecord'][i]['AssetInfo']
                        //     BoxConsRelateConfirm[i]['elecAddr']=data['JustInsertRecord'][i]['elecAddr']
                        //     BoxConsRelateConfirm[i]['id']=i+1
                        //     //this.setState({AssetSerial:this.state.AssetSerial+'('+(i+1)+') '+AssetArray[i]+'  '+elecAddrArray[i]+'  '+BoxConsRelateConfirm[i]+'\n'}) 
                        //   }
                        //   this.setState({sBoxConsRelateConfirm:BoxConsRelateConfirm})  

                        this.setState({boxDisable:false})

                })
          .catch(e => this.setState({uploadResult:e}));                     
      },
      (error) =>  alert("获取GPS信息失败："+error)
    );
 }
 
   gotoScanUpload=( )=>{
    const { navigator } = this.props;
    navigator.replace({
                name: 'ScanUpload',
                component: ScanUpload,
              params: {
                
              }});
  
}

  render() {
    return (
      
    <View  style={styles.container} >   
     <View style={styles.header}> 
        <Text style={styles.headtitle}>扫描上传设备GPS</Text> 
    </View>   

     <ScrollView style={{width:w,}}>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>上传结果：{this.state.uploadResult}{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>这是系统收到的第{this.state.InsertSerial}个GPS信息{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>上传的设备信息为：{this.state.AssetInfo}{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>当前表箱关联设备数：{this.state.boxRelateCount}{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>当前地址关联设备数：{this.state.addrRelateCount}{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>上传的经纬度为：{this.state.Currentlatitude},{this.state.Currentlongitude}{'\n'}</Text>
        </View>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>你在“ {this.state.currentAddr} ”附近{'\n'}</Text>
        </View>


        <View style={{marginTop:10,marginLeft:w*0.3,width:w*0.4}}>
                          <Button                   
                          onPress={ this.gotoScanUpload}
                          title="继续扫描"
                          color="#1DBAF1"
                          disabled={this.state.boxDisable}
                          accessibilityLabel=""
                          />
        </View>
 
    {/* <View style={[styles.textViewStyle,{marginTop:10,height:100}]}>
     <Text style={styles.textStyle}>
        系统关联的表箱号是:{this.state.boxIndex}， 如果与现场不符，请输入现场的表箱号：{'\n'}</Text>
    
      <View  style={{height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
            <TextInput
            style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                underlineColorAndroid="transparent"
                placeholder ="请输入正确的表箱号"
            onChangeText={(text) =>   this.setState({factboxIndex:text})  }
            />

            <View style={{marginLeft:w*0.02,marginBottom:10,height:45,width:w*0.15}}>
                <Button
                onPress={this.confirmboxIndex}
                title="确认"
                color="#ff9a00"
                accessibilityLabel=""
                />
            </View>
    </View>
     </View>

 
       <View>
        {  
               this.state.sBoxConsRelateConfirm.map(               
               (RelateConfirm)=>{              
               return (
                 <View key={RelateConfirm.id} style={{backgroundColor:"white",marginBottom:2}}>
                      <Text style={{fontSize: 15,marginBottom:5,}}>({RelateConfirm.id})表号：{RelateConfirm.AssetNo}{'\n'}   地址：{RelateConfirm.elecAddr}  {RelateConfirm.Confirm}</Text>
                      <View style={{flexDirection:"row",marginBottom:5,height:35,width:w,}}>
                          <View style={{marginLeft:15,width:w*0.3}}>
                          <Button                   
                          onPress={()=>this.confirmOk(RelateConfirm.id-1)}
                          title="在表箱里"
                          color="#ff9a00"
                          accessibilityLabel=""
                          />
                          </View>
                          <View style={{marginLeft:50,marginRight:50,width:w*0.3}}>
                          <Button                        
                          onPress={()=>this.confirmNo(RelateConfirm.id-1)}
                          title="不在表箱里"
                          color="#ff9a00"
                          accessibilityLabel=""
                          />
                          </View>
                      </View>
                 </View>
               )
               //
               } )
         
         }
        </View>  */}
       
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
    backgroundColor: '#f4f6f6',
    marginBottom: 0,
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
  textViewStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
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
  borderRadius:20,},

  addrStyle:{
     color:'red',
  }
})