import React, { Component } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  AsyncStorage,
  Linking,
  
} from 'react-native';

var currentUser
var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

 
 
 
export default class Home extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'home',
      //当前APP版本信息，每次要发布新版本时注意来这里修改当前版本号！
      currentVersion:'V 1.0',
      NewestVersion:'',
      updateDisabled:true,
      availableGps:0,
    };
 }

getAvailableGpsCount=()=>{
  //可用gps数量
    let url="http://1.loactionapp.applinzi.com/adsjlfsjldafsdfaxcveu/availableGps";
            fetch(url,{method:"GET"}).then(response => response.json())            
             .then(data => this.setState({availableGps:data}))
              .catch(e => console.log("Oops,error", e))
}

 
 
 


componentWillMount() {
  
 
 


   //可用gps数量
    this.getAvailableGpsCount()
  
    //版本检查
    try{   
          AsyncStorage.getItem('NewestVersion').then((value) => { 
             this.setState({NewestVersion:value})   
             if(this.state.NewestVersion!=this.state.currentVersion){
               this.setState({updateDisabled:false})
             }
              });
                    
      }
    catch (e) {
        this.setState({NewestVersion:'V 1.0'})   
      } 

}

 removeKey=(key)=>{
            try {
                 AsyncStorage.removeItem(key)                         
                }catch (error){
                    alert(key+'失败',+error);
                }
} 

removeRegistKey=()=>{
    this.removeKey('LoginUserName')
    this.removeKey('tel')
    this.removeKey('department')
    alert("删除成功")
}

updateVersion=()=>{
 
  AsyncStorage.getItem('downAddr').then((value) => { 
     Linking.openURL(value)  
        .catch((err)=>{  
              alert("更新失败，没找到下载地址")
              console.log('An error occurred', err);  
                });
   });
 
}


gotoHelp=()=>{ 
   let url='http://1.loactionapp.applinzi.com/sdfjlajlkfjewou/help'
Linking.openURL(url)  
  .catch((err)=>{  
      alert("失败")
      console.log('An error occurred', err);  
});
   
 
}

//登录的时候就要这样初始化，补充代码！！！！！！！！！！！！！！！
initSearchHistory=()=>{
    
    try {
           this.removeKey('SearchHistory')
           AsyncStorage.setItem('SearchHistory','5,4,3,2') 
           AsyncStorage.setItem('SearchHistoryCount','10') 
          //  AsyncStorage.multiSet([['Search1',''],['Search2',''],['Search3',''],['Search4',''],['Search5','']] );   
          //  AsyncStorage.setItem('SearchArrayCount','5')  //总共存储几个查找记录，与上面的设置要相符，否则会出错！
           //AsyncStorage.setItem('SearchStorageIndex','1')  //存储到第几个搜索记录
           alert("初始化成功")       
                 
    }
  catch (error){
          alert('初始化失败'+error);
   }
     
    
}


  render() {
  
    return (
      <View Style={styles.container} >
      <View style={styles.header}> 
        <Text style={styles.headtitle}>首页</Text> 
    </View> 
       <View style={{width:w, marginBottom:3,}}><Image source={require('./assets/banner.png')} style={{height:h/6,width:w,resizeMode:"stretch"}}/></View>
      <View  style={styles.sbu_view}>
           
        <TouchableOpacity 
        style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}
        onPress={()=>alert('开发中，敬请期待')}>
            <Image source={require('./assets/home1.png')} style={styles.icon_img} />
            <Text>上传历史</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}
        onPress={()=>alert('开发中，敬请期待')}>
            <Image source={require('./assets/home2.png')} style={styles.icon_img} />
            <Text>最近查询</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}
        onPress={()=>alert('开发中，敬请期待')}>
            <Image source={require('./assets/home3.png')} style={styles.icon_img} />
            <Text>附近未上传</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}
          onPress={()=>alert('开发中，敬请期待')}>
            <Image source={require('./assets/home1.png')} style={styles.icon_img} />
            <Text>上传排名</Text>
        </TouchableOpacity>
      
     </View> 
      
        <View style={{width:w,}}>
                    <View style={styles.textViewStyle}>
                        <Text>当前系统可用的GPS地址数量：{this.state.availableGps}</Text> 
                    </View>
                    <View style={[styles.textViewStyle,{height:100}]}>
                        <Text>当前App版本：{this.state.currentVersion}</Text> 
                        <Text>最新App版本：{this.state.NewestVersion}</Text> 
                        <View style={{marginTop:5,marginRight:10,width:w*0.3}}>
                              <Button disabled={this.state.updateDisabled}
                                  onPress={this.updateVersion}
                                  title="更新"
                              />
                        </View>
                   </View>
        </View>



     
       <View style={{flexDirection: 'row',justifyContent: 'flex-start',backgroundColor:"white",marginLeft:2,marginTop:1,marginRight:0,width:w}}>
       <Text style={{alignSelf: 'center', }}>不会使用？点击按钮查看帮助文档--->   </Text> 
      <Button onPress={this.gotoHelp}
              title="app使用帮助"
              />
      </View>
        
         
        <Text   onPress={()=>this.removeRegistKey()  }>删除本机存储的登录信息</Text> 

        <View style={{marginTop:30,marginBottom:10,marginLeft:10}}> 
        <Text style={{fontSize:18,color:'#1DBAF1'}}
               onPress={()=>this.initSearchHistory()}>查询历史记录初始化</Text> 
        </View> 
 
   
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
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
  header: { 
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
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
  textStyle2:{
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
 
},
  textStyle:{
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  icon_img:{
    width:w/6,
    resizeMode:Image.resizeMode.contain,
},
sbu_view:{
    height:70,
    marginLeft: 1,
    marginRight:1,
    borderWidth:1,
    borderRadius:5,
    borderColor:"white",
    marginBottom:10,
    flexDirection:'row',
    //backgroundColor: 'white',
},
sbu_borderRight:{
    borderColor:'#fff',
    borderRightWidth: 0.5,
}
})