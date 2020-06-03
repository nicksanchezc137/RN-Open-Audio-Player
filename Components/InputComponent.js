/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import styles from '../Containers/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Input = props => {
  return (
    <>
     <TextInput secureTextEntry={props.password} placeholder = {props.placeholder} onChangeText = {props.onChangeText} style = {[styles.input_style,props.style]} underlineColorAndroid = "transparent"/>
    </>
  );
};

export default Input;
