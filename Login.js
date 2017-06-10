 
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
AsyncStorage,
Navigator,
} from 'react-native'; 

import Regist from './regist';
import AppMain from './AppMain';


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
 //初始化查询记录
 initSearchHistory=()=>{
    
    try {
           this.removeKey('SearchHistory')
           AsyncStorage.setItem('SearchHistory','0520509096') 
           AsyncStorage.setItem('SearchHistoryCount','10') 
          //  AsyncStorage.multiSet([['Search1',''],['Search2',''],['Search3',''],['Search4',''],['Search5','']] );   
          //  AsyncStorage.setItem('SearchArrayCount','5')  //总共存储几个查找记录，与上面的设置要相符，否则会出错！
           //AsyncStorage.setItem('SearchStorageIndex','1')  //存储到第几个搜索记录
           alert("登录初始化成功")       
                 
    }
  catch (error){
          alert('登录初始化失败'+error);
   }
     
    
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

 
    let formData=new FormData();
    formData.append("tel",this.state.tel);
    formData.append("pass",this.state.pass);
    let url="http://1.loactionapp.applinzi.com/Login";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
    .then(data =>{
            try{   //登录成功，写入登录信息   
                     
                if(typeof(data)=="string")  alert('登录失败：'+data) //登录失败，显示从服务器返回的错误信息
                else{
                            this.initSearchHistory()   //查询定位记录初始化
                            AsyncStorage.setItem('LoginUserName',data.UserName); 
                            AsyncStorage.setItem('tel', data.UserTel); 
                            AsyncStorage.setItem('department', data.UserDept); 
                            alert("欢迎你，"+data.UserDept+" "+data.UserName)
                            const { navigator } = this.props;
                                navigator.replace({
                                name: 'AppMain',
                                component: AppMain,
                                params: {
                                 // SearchAssetNo: assetNo
                                }});
                            
                }
            }
            catch(e){
                 alert("出错了"+JSON.stringify(data))
            }

    })
    .catch(e => console.log("Oops,error", e))
  
}

gotoRegist=()=>{
const { navigator } = this.props;
                navigator.replace({
                    name: 'Regist',
                    component: Regist,
                    params: {
                   // SearchAssetNo: assetNo
                }});
 
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
        <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入密码'
        secureTextEntry={true} onChangeText={(text) => this.setState({pass:text})} />
        <View style={styles.dividerview}> 
            <Text style={styles.divider}></Text> 
        </View> 
    </View> 
    <View style={{marginLeft:w*0.1,marginTop:10,width:w*0.8,height:40,borderRadius:6,}}>
                        <Button    
                            sytle={{borderRadius:6,fontSize:20}}   
                            onPress={this.startLogin}
                            title="登录"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            />
    </View> 
   
          
<View style={{flexDirection:'row',justifyContent: 'space-between', alignItems: 'center', height:20,width:w,marginTop:30}}>
        <View style={styles.bottomleftbtnview}> 
                <Text style={styles.bottombtn}  onPress={this.gotoRegist}>注册新账号</Text> 
        </View> 

        <View style={styles.bottomleftbtnview}> 
                <Text style={styles.bottombtn} onPress={()=>alert("请发送你的登录手机号码、部门和姓名到18959298867，注明：需重置密码")}>忘记密码？</Text> 
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
 