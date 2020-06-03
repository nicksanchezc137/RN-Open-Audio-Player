import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0b0b',
    flex: 1,
  },
  sidemenu:{
    backgroundColor:"#121212",
    flex:1,
    
  },
  side_menu_text:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:17
  },
  side_menu_text2:{
    color:"#fff",
    fontSize:17, 
    marginTop:15,
    marginLeft:20,
    fontFamily: "Open Sans",
    fontWeight:"100"
  },
  close:{
    position:"absolute",
    top:15,
    left:20
  },
  btn_:{
   marginLeft:20,
   marginTop:15
  },
  audio_card:{
   height:250,
   alignItems:"center",
   flexDirection:"column",
   justifyContent:"center",
   marginBottom:10
  },
  text_cntr:{
   alignSelf:"flex-start",
   marginLeft:21, 
   alignItems:"flex-start",
   flexDirection:"column"
  },
  track_name:{
    color:"#fff",
    fontWeight:"bold",
    
  },
  play_icon:{
   position:"absolute",
   top:40,
   right:40,
   width:50,
   height:50,
   borderRadius:25,
   backgroundColor:"#FC0254",
   alignItems:"center",
   justifyContent:"center"
  },
  track_desc:{
    color:"#fff",
  },
  h1: {
    color:"#fff",
    fontWeight:"bold",
    margin:21,
    fontSize: 24,
  },
  h2: {
    color:"#fff",
    fontWeight:"bold",
    margin:21,
    fontSize: 20,
  },
  h3: {
    color:"#fff",
    fontWeight:"bold",
    fontSize:15,
  },
  track_container:{
    alignItems:"center",
    width:"100%",
  },
  img:{
    resizeMode:"cover",
    width:width-40,
    height:210,
    borderRadius:10
  },
  playlist_title:{
  flexDirection: 'row',
   width:"100%",
  },
  arrow_icon:{
    position:"absolute",
    right:21,
    marginTop:21
  },
  header: {
    height: height / 11,
    backgroundColor: '#0d0b0b',
    elevation: 3,
    justifyContent:"center",
    alignItems:"center",
  },
  header_text: {
    fontSize: 28,
    color: '#fefefe',
  },
  drawer:{
  width:40,
  height:40,
  position:"absolute",
  top:"30%",
  left:21
  },
  logo: {
  width:100,
  height:20,


  },
  audio_player:{
    backgroundColor:"#121212",
    width:"100%",
    flexDirection:"row",
    height:60,
    justifyContent:"center",
    alignItems:"center"
    
  },
  back_btn:{
   position:"absolute",
   left:41
  },
  next_btn:{
   position:"absolute",
   right:41
  },
  backward:{
    position:"absolute",
    left:86
   },
   forward:{
    position:"absolute",
    right:86
   },
   progress: {
    width:width-88,
  },
  progress_container:{
    backgroundColor:"#121212",
    width:"100%",
    flexDirection:"row"
  },
  btn_cntr:{
    height:60,
    backgroundColor:"#FC0254",
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    width:width-42

  },
  input_style:{
    backgroundColor:"#fff",
    borderRadius:8,
    height:60,
    justifyContent:"center",
    alignItems:"center",
    width:width-42
  },
  list_contr:{
  flexDirection:"row",
  marginLeft:21,
  marginRight:21,
  marginTop:5,
  justifyContent:"flex-start",
  width:"100%",
  },
  btn_list:{
    position:"absolute",
    right:41,
    top:15
    
  },
  icon_:{
    width:40,
    height:40
  }
});

export default styles;
