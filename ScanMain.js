import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import ScanUpload from './ScanUpload'; 

var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高


export default class ScanMain extends Component {
 constructor(props) {
 super(props);
 this.state = {
      selectedTab:'ScanMain'
    };
 }

  gotoScan=()=>{
     const { navigator } = this.props;
     navigator.replace({
        name: 'ScanUpload',
        component: ScanUpload,
        });
 }
 
  render() {
    return (
      <View style={styles.container}>  
 

           <View style={styles.header}> 
                  <Text style={styles.headtitle}>扫描上传</Text> 
           </View>              
                <View style={{marginBottom:10,width:w*0.4,marginTop:40}}>
                        <Button          
                            onPress={this.gotoScan}
                            title="扫描条形码上传"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                        />
              </View>
 



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
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
    header: { 
    height: 40, 
    width:w,
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
  }
})