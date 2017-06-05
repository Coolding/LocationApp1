import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Navigator,
  Text,
  AsyncStorage,
 
} from 'react-native';
import Camera from 'react-native-camera';
import ScanUploadResult from './ScanUploadResult';
import ScanMain from './ScanMain';

var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var currentLoginUserName='';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'flex-start', 
    width:w
}, 
leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
headtitle: { 
    marginLeft:90,
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: w*0.6,
        width: w*0.6,
        marginBottom:80,
        marginLeft:0,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent'
    },
});

 
 //返回到扫描按钮界面

export default class ScanUpload extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
 
  }

 

  componentWillMount= () => {
 
   //获取当前登录用户的部门和姓名，用于上传GPS信息时记录上传人员
     AsyncStorage.getItem('department').then((department) => { 
            if(department!=null)  {
                currentLoginUserName=department                
                AsyncStorage.getItem('LoginUserName').then((LoginUserName) => {
                            currentLoginUserName=currentLoginUserName+' '+LoginUserName
                            
                        }) 
              }
             else currentLoginUserName=''
 });
    
  }
 

//扫描到条形码
  onBarCodeRead=(e)=>{
    const { navigator } = this.props;
    navigator.replace({
                name: 'ScanUploadResult',
                component: ScanUploadResult,
              params: {
                ScanedAssetNo: e.data,
                currentLoginUserName:currentLoginUserName,
              }});
    console.log(e.data);  
}

 
 gotoScanButton=() =>{
    const { navigator } = this.props;
    navigator.replace({
                name: 'ScanMain',
                component: ScanMain,
              params: {
              }});
    
}


  render() {
    return (
      <View style={styles.container}>
           <View style={styles.header}> 
            <TouchableOpacity   
                style={{alignSelf:'center',}}            
                onPress={this.gotoScanButton}>
                <Text style={styles.leftitle}>返回</Text> 
            </TouchableOpacity>
            <Text style={styles.headtitle}>扫描上传</Text> 
           </View>  
     
                <StatusBar
                  animated
                  hidden
                />
                <Camera
                  ref={(cam) => {
                    this.camera = cam;
                  }}
                  style={styles.preview}
                  aspect={this.state.camera.aspect}
                  captureTarget={this.state.camera.captureTarget}
                  type={this.state.camera.type}
                  flashMode={this.state.camera.flashMode}
                  defaultTouchToFocus
                  mirrorImage={false}
                  onBarCodeRead={this.onBarCodeRead} >
                  <View style={styles.rectangleContainer}>               
                      <View style={styles.rectangle} />
                  </View>
                </Camera>
             
   
      </View>
    );
  }
 


}