import React, { Component } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
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
  writeStor = () => {   
        storage.save({
    key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
    rawData: { 
      from: 'some other site',
      userid: 'some userid',
      token: 'some token',
      currentUserName:"王丁盛",
    },

    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
    expires: null
  }); 
}
  readStor =() => {   
      storage.load({
    key: 'loginState',
    // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
    autoSync: true,
    // syncInBackground(默认为true)意味着如果数据过期，
    // 在调用sync方法的同时先返回已经过期的数据。
    // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
    syncInBackground: true,
    // 你还可以给sync方法传递额外的参数
    syncParams: {
      extraFetchOptions: {
        // 各种参数
      },
      someFlag: true,
    },
  }).then(ret => {
    // 如果找到数据，则在then方法中返回
    // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
    // 你只能在then这个方法内继续处理ret数据
    // 而不能在then以外处理
    // 也没有办法“变成”同步返回
    // 你也可以使用“看似”同步的async/await语法
    //console.log(ret.readPara);
    alert(ret.currentUserName);
    //this.setState({ user: ret });
    return ret
  }).catch(err => {
    //如果没有找到数据且没有sync方法，
    //或者有其他异常，则在catch中返回
    console.warn(err.message);
    switch (err.name) {
        case 'NotFoundError':
            // TODO;
            break;
        case 'ExpiredError':
            // TODO
            break;
    }
  })
}

 
  render() {
  
    return (
      <View Style={styles.container} >
      <View  style={{height:40,backgroundColor:'#46A3FF',justifyContent: 'center',}} ><Text style={{fontSize:20,textAlign:'center'}}>首页</Text></View>
      <View style={{width:w, marginBottom:10,}}><Image source={require('./assets/banner.png')} style={{height:h/6,width:w,resizeMode:"stretch"}}/></View>
      <View  style={styles.sbu_view}>
           
        <TouchableOpacity style={{marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home1.png')} style={styles.icon_img} />
            <Text>上传历史</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home2.png')} style={styles.icon_img} />
            <Text>最近查询</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:3,flex:1,justifyContent: 'flex-start',alignItems:'center',}}>
            <Image source={require('./assets/home3.png')} style={styles.icon_img} />
            <Text>附近未上传</Text>
        </TouchableOpacity>
      
     </View> 
     <Button
        onPress={this.writeStor}
        title="写入"
    />
      <Button
        onPress={this.readStor}
        title="读取"
    />
   
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
    backgroundColor: '#F5FCFF',
    //marginBottom: 100,
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
    height:104,
    marginLeft: 1,
    marginRight:1,
    borderWidth:1,
    borderRadius:5,
    marginBottom:10,
    flexDirection:'row',
},
sbu_borderRight:{
    borderColor:'#fff',
    borderRightWidth: 0.5,
}
})