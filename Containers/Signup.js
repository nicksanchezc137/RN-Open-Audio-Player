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
const Signup = props => {
  const [user, setUSer] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const signupWithEmailAndPassword = () => {
    console.log(email, password, username);
    if (email.trim() && password.trim()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((res) => {
          console.log(res.user);

          //save user on local storage
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(
              function () {
                console.log("user logged in");
                props.onComplete()
              },
              function (error) {
                // An error happened.
              }
            );
          saveUser({
            fuid: res.user.uid,
            email,
            name: username,
            phone: "",
            type: "user",
          });
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          this.setState({ loading: false });
          let errorMessage = error.message;
          // this.warningNotification(errorMessage);
          alert(errorMessage);
        });
    } else {
      // this.setState({ loading: false });
      //this.warningNotification("Please fill in all the fields");
      alert("Please fill in all the fields");
    }
  };

  const saveUser = (user) => {
    try {
      console.log("data is ", user);
      Api.post("create_user.php", user)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            // this.props.history.push("/app");
            // this.props.setUser({...user});

            dispatch(setUser({...user,id:res.data.message}));
            // this.setState({ loading: false });
          } else {
            console.log("Email exists");
            // this.warningNotification("A user with the same email exists");
            // this.setState({ loading: false });
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          // this.warningNotification("An error has occured. Please try again later.");
          // this.setState({ loading: false });
        });
    } catch (error) {
      console.log("Error", error);
      // this.warningNotification("An error has occured. Please try again later.");
      // this.setState({ loading: false });
    }
  };

  return (
    <>
       <Container>
        <Header
          hideDrawer={true}
          title={'Sign Up'}
          navigation={props.navigation}
        />
        <Text style={[styles.h1, {alignSelf: 'center'}]}>Creat your free account</Text>
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Input
              style={{marginTop: 20}}
              placeholder="username"
              onChangeText={text => setUsername(text)}
            />
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
              name="Sign Up"
              onPress={() => signInWithEmailAndPassword()}
            />

            <TouchableOpacity onPress = {()=>props.navigation.navigate("Login")} style={[styles.btn_, {marginTop: 21}]}>
              <Text style={styles.side_menu_text}>Already have an Account? Login here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default Signup;
