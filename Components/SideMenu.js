import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import styles from '../Containers/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SideMenu = props => {
  const navigateTo = (screen)=>{
    props.navigation.navigate(screen);
  }
  return (
    <View style={styles.sidemenu}>
       <TouchableOpacity style = {styles.close} onPress = {()=>navigateTo("DrawerClose")}>
         <Icon name = "times" color = "#fff"/>
        </TouchableOpacity>

      <View style = {{marginLeft:40,marginTop:40,flexDirection:"column"}}>

     
        
      <Text style = {styles.side_menu_text2}>Main Menu</Text>
        <TouchableOpacity style = {styles.btn_} onPress = {()=>navigateTo("Home")}>
          <Text style = {styles.side_menu_text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.btn_}>
          <Text style = {styles.side_menu_text} onPress = {()=>navigateTo("Playlist")}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btn_}>
          <Text style = {styles.side_menu_text} onPress = {()=>navigateTo("TopMusic")}>Top Weekly</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btn_}>
          <Text style = {styles.side_menu_text}>Support</Text>
        </TouchableOpacity>

        <Text style = {styles.side_menu_text2}>Settings</Text>

        <TouchableOpacity style = {styles.btn_}>
          <Text style = {styles.side_menu_text} onPress = {()=>navigateTo("Login")}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btn_}>
          <Text style = {styles.side_menu_text}>About</Text>
        </TouchableOpacity>

        <Text style = {[styles.side_menu_text,{marginLeft:20,marginTop:10}]}>1.0.0</Text>
        <Text style = {styles.side_menu_text2}>info@ibua.co.ke</Text>



      </View>
    </View>
  );
};

export default SideMenu;
