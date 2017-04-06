 
import React, {Component} from 'react'; 
import { 
AppRegistry, 
StyleSheet, 
Text, 
Image, 
View, 
TextInput 
} from 'react-native'; 
export default class Login extends React.Component {
render() { 
return ( 
<View style={styles.container}> 
<View style={styles.header}> 
<Text style={styles.headtitle}>添加账号</Text> 
</View> 
<View style={styles.marginTopview}/> 
<View style={styles.inputview}> 
<TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='QQ号/手机号/邮箱'/> 
<View style={styles.dividerview}> 
<Text style={styles.divider}></Text> 
</View> 
<TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='密码'
secureTextEntry={true}/> 
</View> 
<View style={styles.bottomview}> 
<View style={styles.buttonview}> 
<Text style={styles.logintext}>登 录</Text> 
</View> 
<View style={styles.bottombtnsview}> 
<View style={styles.bottomleftbtnview}> 
<Text style={styles.bottombtn}>无法登录？</Text> 
</View> 
<View style={styles.bottomrightbtnview}> 
<Text style={styles.bottombtn}>新用户</Text> 
</View> 
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
height: 15, 
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
backgroundColor: '#1DBAF1', 
margin: 10, 
borderRadius: 6, 
justifyContent: 'center', 
alignItems: 'center', 
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
 