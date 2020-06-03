/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import styles from '../Containers/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = props => {
  return (
    <>
      <View style={styles.header}>
        {props.hideDrawer ? null : (
          <TouchableOpacity
            style={styles.drawer}
            onPress={() => {
              props.navigation.navigate('DrawerOpen');
            }}>
            <Icon name="bars" color="#fff" size={20} />
          </TouchableOpacity>
        )}
        {props.title ? (
          <Text style={styles.h2}> {props.title} </Text>
        ) : (
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        )}
      </View>
    </>
  );
};

export default Header;
