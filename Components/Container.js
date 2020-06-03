/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styles from '../Containers/Styles';


const Container = props => {

  return (
    <>
    <View style = {styles.container}>
       {props.children} 
    </View>
   
    </>
  );
};

export default Container;
