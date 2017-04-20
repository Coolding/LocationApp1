 
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
AsyncStorage
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

  
  }  

removeKey=(key)=>{
            try {
                    AsyncStorage.removeItem(key)
                         
                }catch (error){
                    alert(key+'失败',+error);
                }
} 
 
removeRegistKey=()=>{
    this.removeKey('username')
    this.removeKey('tel')
    this.removeKey('department')
    this.removeKey('userID')
    this.removeKey('RegStatus')
    alert("删除成功")
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


let ReadStatus;
    let userID;
 
     
    try{    //如果还没有注册或者是新手机，则变量storage还未定义（在注册时或者换了新手机，首次登录才会定义）
                    AsyncStorage.getItem('tel').then((value) => tel=value)      
                     AsyncStorage.getItem('userID').then((value) => {userID=value;alert('userID是'+value+"tel是"+tel); } )     
                    if(userID==null) { this.setState({RegStatus:-1}); return  }
                    
                     AsyncStorage.getItem('RegStatus').then((value) => { 
                              if(value==2)  //已登录
                                  {  this.setState({RegStatus:3})  } 
                              else{  //还没登录，获取审批状态
                                        //alert(ret.department)
                                        let url="http://1.loactionapp.applinzi.com/GetUserStatus/"+userID;
                                        fetch(url,{method:"GET"}).then(response => response.json())
                                        .then(data => {
                                                    if(data==1) this.setState({RegStatus:2})   //已审批通过，显示登录页面，同时显示审批情况
                                                    else if (data==0) this.setState({RegStatus:1})   //还未审批，显示登录页面，同时显示审批情况
                                                    else if(data==-1) this.setState({RegStatus:-2})   //审批不通过，显示注册页面（重新注册）
                                                    else if(data==-2) this.setState({RegStatus:-3})   //没找到该ID，一般是不会发生，显示注册页面
                                                    //alert(this.state.RegStatus)
                                        })    //加1是因为处理数据库里面app上传的地址，还有1个根据用电地址反推的定位信息
                                        .catch(e => console.log("Oops, error", e))
                              }
                    });
                    
    }
    catch (e) {
        //alert("没找到storage")
        this.setState({RegStatus:-1})  //还没注册（或者换新手机），显示注册页面
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
        <Text style={styles.bottombtn} onPress={()=>this.removeRegistKey()  }>删除本机存储的注册信息</Text> 
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
 