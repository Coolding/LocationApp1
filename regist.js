 
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
} from 'react-native'; 
import Login from './Login';
//发送注册信息时，要判断手机号是否唯一

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
 


export default class Regist extends React.Component {

    constructor(props) {  
    super(props); 
     this.state = {
     tel:"",
     name:"",
     department:"",
     regDisable:false
    }; 

   
  }  

 
gotoLogin=()=>{
const { navigator } = this.props;
                navigator.replace({
                    name: 'Login',
                    component: Login,
                    params: {
                   // SearchAssetNo: assetNo
                }});
    
}

regf=()=>{
   
    let reg=/^[0-9]{11}$/   
    if(this.state.name==""){
            alert ("请输入名字")
            return 0
    }
    if(this.state.department==""){
            alert ("请输入部门")
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
    this.setState({regDisable:true})
    let url="http://1.loactionapp.applinzi.com/Regist";
    let formData=new FormData();        
    formData.append("UserName",this.state.name);        
    formData.append("UserTel",this.state.tel);        
    formData.append("UserDept",this.state.department);
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())  
    .then(data => {        
                //alert(data)
                AsyncStorage.setItem('username',this.state.name); 
                AsyncStorage.setItem('tel',  this.state.tel); 
                AsyncStorage.setItem('department', this.state.department); 
                AsyncStorage.setItem('userID', data+''); 
                AsyncStorage.setItem('RegStatus', '0'); 
                const { navigator } = this.props;
                navigator.replace({
                    name: 'Login',
                    component: Login,
                    params: {
                   // SearchAssetNo: assetNo
                }});

                alert("注册成功，请等待后台人工审核，大约需要1天时间")
            
    } )
    .catch(e => console.log("Oops,error", e))    

    

}

render() { 
return ( 
<View style={styles.container}> 
    <View style={styles.header}> 
        <Text style={styles.headtitle}>注册</Text> 
    </View> 

    <View style={styles.marginTopview}/>

    <View style={styles.inputview}> 
        <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入手机号'
            onChangeText={(text) => this.setState({tel:text})} />
        <View style={styles.dividerview}> 
            <Text style={styles.divider}></Text> 
        </View> 
        <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入部门和班组'
            onChangeText={(text) => this.setState({department:text})} />
        <View style={styles.dividerview}> 
            <Text style={styles.divider}></Text> 
        </View> 
        <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入真实姓名'
            onChangeText={(text) => this.setState({name:text})} />
        <View style={styles.dividerview}> 
            <Text style={styles.divider}></Text> 
        </View> 
    </View> 
    <View style={{marginLeft:w*0.1,marginTop:10,width:w*0.8,height:80,borderRadius:6,}}>
                        <Button    
                            sytle={{borderRadius:6,fontSize:20}}   
                            onPress={this.regf}
                            title="注册"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            disabled={this.state.regDisable}
                            />
    </View> 
    <View style={styles.bottomleftbtnview}> 
         <Text>{this.props.RegStatus}</Text>
    </View> 
    <View style={styles.bottomleftbtnview}> 
        <Text style={styles.bottombtn}
               onPress={this.gotoLogin}>我有账号，直接登录</Text> 
    </View> 
    <View style={styles.bottomrightbtnview}> 
        <Text style={styles.bottombtn}>忘记密码？</Text> 
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
height: 150, 
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
//height: 50, 
paddingLeft: 10, 
alignItems: 'flex-start', 
justifyContent: 'center', 
}, 
bottomrightbtnview: { 
flex: 1, 
//height: 50, 
paddingRight: 10, 
alignItems: 'flex-end', 
justifyContent: 'center', 
}, 
bottombtn: { 
fontSize: 15, 
color: '#1DBAF1', 
} 
}); 
 