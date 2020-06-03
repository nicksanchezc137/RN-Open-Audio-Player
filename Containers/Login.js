/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Container from '../Components/Container';
import Header from '../Components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {getMusic} from '../helpers/getMusic';
import {setUser} from '../redux/actions/actions';
import {ScrollView} from 'react-native-gesture-handler';
import AudioTrackCard from '../Components/AudioTrackCard';
import LoadingComponent from '../Components/LoadingComponent';
import styles from './Styles';
import firebase from '../services/Firebase';
import {Api} from '../services/Api';
import Input from '../Components/InputComponent';
import Button from '../Components/Button';

function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const signInWithEmailAndPassword = () => {
    if (email.trim() && password.trim()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(res => {
          console.log(res);
          //save user in the redux store
          console.log(res.user);
          let user_data = {
            email: email,
            fuid: res.user.uid,
          };
          getUser(res.user.uid, user_data);
        })
        .catch(error => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // this.warningNotification("Error logging in, please confirm you have typed in your email and passowrd correctly.");
          // this.setState({loading:false})
        });
    } else {
      // this.warningNotification("Please fill all the fields");
      // this.setState({loading:false})
    }
  };
  const getUser = (fuid, user) => {
    //var fuid = localStorage.getItem("fid");
    try {
      let data = {
        fuid: fuid,
      };
      console.log('data is ', data);
      Api.post('get_user.php', data)
        .then(res => {
          console.log('data is ', JSON.stringify(res.data));
          if (res.data.message == 'User not found') {
            alert('Cannot find user');
          } else if (res.data.status == 'Success') {
            console.log('user logged in');
            dispatch(
              setUser({
                ...user,
                name: res.data.message.name,
                id: res.data.message.id,
                phone: '',
              }),
            );
            props.navigation.navigate('Home');
          }
        })
        .catch(error => {
          console.log('Error: ', error);
          alert(error);
          // this.setState({loading:false})
        });
    } catch (error) {
      console.log('Error', error);
      alert(error);
      // this.setState({loading:false})
    }
  };
  return (
    <>
      <Container>
        <Header
          hideDrawer={true}
          title={'Login'}
          navigation={props.navigation}
        />
        <Text style={[styles.h1, {alignSelf: 'center'}]}>Welcome back</Text>
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Input
              style={{marginTop: 20}}
              placeholder="email"
              onChangeText={text => setEmail(text)}
            />
            <Input
              style={{marginTop: 20}}
              placeholder="password"
              password={true}
              onChangeText={text => setPassword(text)}
            />
            <Button
              style={{marginTop: 20}}
              name="Login"
              onPress={() => signInWithEmailAndPassword()}
            />

            <TouchableOpacity onPress = {()=>props.navigation.navigate("Signup")} style={[styles.btn_, {marginTop: 21}]}>
              <Text style={styles.side_menu_text}>No Account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}

export default Login;
