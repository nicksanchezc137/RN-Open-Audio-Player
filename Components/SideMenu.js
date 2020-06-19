import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, Text, View, Alert} from 'react-native';
import styles from '../Containers/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SideMenu = props => {
  const navigateTo = screen => {
    props.navigation.navigate(screen);
  };
  return (
    <View style={styles.sidemenu}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => navigateTo('DrawerClose')}>
        <Icon name="times" color="#fff" />
      </TouchableOpacity>

      <View style={{marginLeft: 40, marginTop: 40, flexDirection: 'column'}}>
        <Text style={styles.side_menu_text2}>Main Menu</Text>
        <TouchableOpacity
          style={styles.btn_}
          onPress={() => navigateTo('Home')}>
          <Text style={styles.side_menu_text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_}>
          <Text
            style={styles.side_menu_text}
            onPress={() => navigateTo('Playlist')}>
            Playlists
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn_}>
          <Text
            style={styles.side_menu_text}
            onPress={() => navigateTo('TopMusic')}>
            Top Weekly
          </Text>
        </TouchableOpacity>

        <Text style={styles.side_menu_text2}>Settings</Text>

        <TouchableOpacity style={styles.btn_}>
          <Text
            style={styles.side_menu_text}
            onPress={() => navigateTo('Login')}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn_}
          onPress={() => {
            Alert.alert(
              'About Open Audio',
              'An open source audio player for podcasts and music. For more information visit https://github.com/nicksanchezc137/Open-Audio-Player',
             [
              {text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: true},
            );
          }}>
          <Text style={styles.side_menu_text}>About</Text>
        </TouchableOpacity>

        <Text style={[styles.side_menu_text, {marginLeft: 20, marginTop: 10}]}>
          1.0.0
        </Text>
        
      </View>
    </View>
  );
};

export default SideMenu;
