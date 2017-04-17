 
import React, {Component} from 'react'; 
import { 
AppRegistry, 
StyleSheet, 
Text, 
Image, 
View, 
Dimensions,
TextInput,
Button,
} from 'react-native'; 

//换新手机，直接登录，要下载账号信息并存储到本机


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高



export default class Login extends React.Component {

    constructor(props) {  
    super(props); 
     this.state = {
     tel:"",
     pass:""
    }; 

    this.readStor=this.readStor.bind(this)
  }  

writeStor = () => {   
    storage.save({
    key: 'userData',  // 注意:请不要在key中使用_下划线符号!
    rawData: { 
      username: this.state.name,
      tel: this.state.tel,
      department:this.state.department,
    },
    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
    expires: null
  }); 
}

readStor =() => {  
   
    storage.load({
    key: 'userData',
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
    alert(ret.username);
    alert("读取成功")
    return ret
  }).catch(err => {
    //如果没有找到数据且没有sync方法，
    //或者有其他异常，则在catch中返回
    console.warn(err.message);
    alert("读取失败")
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

startLogin=()=>{
    let reg=/^[0-9]{11}$/   
    if(this.state.pass==""){
            alert ("请输入密码")
            return 0
    }
    if(this.state.tel==""){
            alert ("请输入手机号")
            return 0
    }   
	if(reg.test(this.state.tel)==false )
    {
        alert("手机号输入有误，请重输")
        return 0
    }

 
}

render() { 
return ( 
<View style={styles.container}> 
    <View style={styles.header}> 
        <Text style={styles.headtitle}>登录</Text> 
    </View> 

    <View style={styles.marginTopview}/>

    <View style={styles.inputview}> 
        <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入登录手机号'
            onChangeText={(text) => this.setState({tel:text})} />
        <View style={styles.dividerview}> 
            <Text style={styles.divider}></Text> 
        </View>        
        <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='密码'
        secureTextEntry={true} onChangeText={(text) => this.setState({pass:text})} />
        <View style={styles.dividerview}> 
            <Text style={styles.divider}></Text> 
        </View> 
    </View> 
    <View style={{marginLeft:w*0.1,marginTop:10,width:w*0.8,height:80,borderRadius:6,}}>
                        <Button    
                            sytle={{borderRadius:6,fontSize:20}}   
                            onPress={this.startLogin}
                            title="登录"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            />
    </View> 
    <View style={styles.bottombtnsview}> 
          
<View style={styles.bottomleftbtnview}> 
         <Text>{this.props.RegStatus}</Text>
</View> 
<View style={styles.bottomleftbtnview}> 
        <Text style={styles.bottombtn} onPress={()=>alert("请发送你的登录手机号码、部门和姓名到18959298867，注明：需重置密码")}>忘记密码？</Text> 
</View> 
<View style={styles.bottomrightbtnview}> 
        <Text style={styles.bottombtn} onPress={()=>{  storage.remove({key: 'userData'});  alert("删除完成")}}>删除本机存储的注册信息</Text> 
</View> 
</View> 

</View> 
); 
} 
} 
const styles = StyleSheet.create({ 
container: { 
flex: 1, 
backgroundColor: '#FFFFFF'
}, 
header: { 
height: 50, 
backgroundColor: '#12B7F5', 
justifyContent: 'center', 
}, 
headtitle: { 
alignSelf: 'center', 
fontSize: 20, 
color: '#ffffff', 
}, 
avatarview: { 
height: 150, 
backgroundColor: '#ECEDF1', 
justifyContent: 'center', 
}, 
avatarimage: { 
width: 100, 
height: 100, 
alignSelf: 'center'
}, 
marginTopview: { 
height: 3, 
backgroundColor: '#F7F7F9'
}, 
inputview: { 
height: 100, 
}, 
textinput: { 
flex: 1, 
fontSize: 16, 
}, 
dividerview: { 
flexDirection: 'row', 
}, 
divider: { 
flex: 1, 
height: 1, 
backgroundColor: '#ECEDF1'
}, 
bottomview: { 
backgroundColor: '#ECEDF1', 
flex: 1, 
}, 
buttonview: { 
backgroundColor: 'white', 
marginLeft: w*0.1, 
borderRadius: 6, 
justifyContent: 'center', 
alignItems: 'center', 
marginBottom:10,
width:w*0.8
}, 
logintext: { 
fontSize: 17, 
color: '#FFFFFF', 
marginTop: 10, 
marginBottom: 10, 
}, 
emptyview: { 
flex: 1, 
}, 
bottombtnsview: { 
flexDirection: 'row', 
}, 
bottomleftbtnview: { 
flex: 1, 
height: 50, 
paddingLeft: 10, 
alignItems: 'flex-start', 
justifyContent: 'center', 
}, 
bottomrightbtnview: { 
flex: 1, 
height: 50, 
paddingRight: 10, 
alignItems: 'flex-end', 
justifyContent: 'center', 
}, 
bottombtn: { 
fontSize: 15, 
color: '#1DBAF1', 
} 
}); 
 