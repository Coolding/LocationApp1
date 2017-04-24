import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Navigator,
} from 'react-native';
import Camera from 'react-native-camera';
import scanSearchResult from './scanSearchResult';

var Dimensions = require('Dimensions');
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
        marginBottom:0,
        marginLeft:0,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent'
    },
});

export default class ScanSearch extends React.Component {
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
 
    };

   
  }

 
  
   
 
 
 

 split1=(sourceString,splitString)=> {
    let returnArrar=[]
    let i=0
    let start=sourceString.indexOf(splitString)
    if(start<0)
      return sourceString
    let end=0
    while(sourceString.indexOf(splitString)>=0)
      a=a.replace("  "," ")
 }
//扫描到条形码
  onBarCodeRead=(e)=>{
    const { navigator } = this.props;
    let b=[]
    a=e.data
    a=a.replace(","," ")
    a=a.replace("."," ")
    a=a.replace("/"," ")
    a=a.replace(""," ")
    a=a.replace("，"," ")
    a=a.replace(";"," ")
    //a=a.replace("\\n"," ")
    //a=a.replace("\\r"," ")
    a=a.replace(/\r\n/g," ")
    //a=a.replace(/\n/g," ")
    
    while(a.indexOf("  ")>=0)
      a=a.replace("  "," ")  
    
    while(a.indexOf(" ")==0)  //去除左边的空格
      a=a.slice(1,a.length-1)
    while(a.lastIndexOf(" ")==0)  //去除右边的空格
      a=a.slice(0,a.length-2)
   
    b=a.split(" ")
    
   
    //return (e.data.split(" "))
    navigator.replace({
                name: 'scanSearchResult',
                component: scanSearchResult,
              params: {
                AllScanedAssetNo: b
              }});
    console.log(e.data);  
}


  render() {

    return (
      <View style={styles.container}>
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
