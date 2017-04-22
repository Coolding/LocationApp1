import React, { Component } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  AsyncStorage,
} from 'react-native';

var currentUser
var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

class Tbb extends Component {  
 render() {
    let a=[{id:1,index:1},{id:2,index:2},{id:3,index:3},];
      return (
        <View>
        {  a.map( function(x){ return <Text key={x.id}>第{x.index}个</Text>} )   }
        </View>
        );  
    
 }
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

 
export default class Home extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'home'
    };
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

  render() {
  
    return (
      <View Style={styles.container} >
      <View style={styles.header}> 
        <Text style={styles.headtitle}>首页</Text> 
    </View> 
       <View style={{width:w, marginBottom:3,}}><Image source={require('./assets/banner.png')} style={{height:h/6,width:w,resizeMode:"stretch"}}/></View>
      <View  style={styles.sbu_view}>
           
        <TouchableOpacity style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home1.png')} style={styles.icon_img} />
            <Text>上传历史</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home2.png')} style={styles.icon_img} />
            <Text>最近查询</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home3.png')} style={styles.icon_img} />
            <Text>附近未上传</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'white',marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home1.png')} style={styles.icon_img} />
            <Text>上传排名</Text>
        </TouchableOpacity>
      
     </View> 
   
   
        <Text   onPress={()=>this.removeRegistKey()  }>删除本机存储的登录信息</Text> 
 
   <Tbb />
   <Greeting name='Valeera' />
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