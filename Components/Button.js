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

const Button = props => {
  return (
    <>
      <TouchableOpacity style = {[styles.btn_cntr,props.style]} onPress = {props.onPress}>
        <Text style = {styles.h2}>{props.name}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
