/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import Container from '../Components/Container';
import Header from '../Components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {getMusic} from '../helpers/getMusic';
import {ScrollView} from 'react-native-gesture-handler';
import AudioTrackCard from '../Components/AudioTrackCard';
import LoadingComponent from '../Components/LoadingComponent';
import styles from './Styles';
import FastImage from 'react-native-fast-image';
import Button from '../Components/Button';
import { Api } from '../services/Api';
import TrackListItem from '../Components/TrackListItem';
import { setRecent,setProperties,setPlaylist,setTrack } from '../redux/actions/actions';
import { SET_PLAYING } from '../redux/actions/action_types';
import { playTrack } from '../Components/playTrack';

const Track = props => {
  const dispatch = useDispatch();
  const [modal_visible, setModalVisible] = useState(false);
  const [user_tracks, setuserTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.setUser);
  const track = props.navigation.state.params.track;
  const recent = useSelector(state => state.rootReducer.setRecent);

  useEffect(() => {
    setLoading(true)
    getTrack();
    //this.props.match.params.id;
  }, []);

  const renderItem = ({item}) => {
    return <TrackListItem track = {item} playlist = {user_tracks}/>
  };
  const addToRecent = (track)=>{
    // console.log(track)
     let recent_playlist = [...recent];
     recent_playlist.splice(0, 0, track);
     let check_contains = recent.some((x) => x.id == track.id);
     if (!check_contains) {
       let arr = recent_playlist.filter((x, i) => i < 4);
       console.log("recent playlist is -----", arr);
       dispatch(setRecent(arr));
     }
   }
  const getTrack = () => {
   
    try {
      let data = {
        id: track.id,
      };
      console.log("data is ", data);
      Api.post("get_track.php", data)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            //setTrackState(res.data.message);
            setuserTracks(res.data.tracks);
            setLoading(false)
            //
            //sthis.setState({loading:false})
          }
        })
        .catch((error) => {
          //console.log("Error: ", error);
           //this.setState({loading:false})
        });
    } catch (error) {
      console.log("Error", error);
      // this.setState({loading:false})
    }
  };
  const renderMusic = () => {
     const   ITEM_HEIGHT = styles.audio_card.height + styles.audio_card.marginBottom;
    return (
      <>
        <FlatList
        nestedScrollEnabled 
          data={user_tracks}
          renderItem={renderItem}
          initialNumToRender={8}
          windowSize={10}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          maxToRenderPerBatch={10}
          keyExtractor={item => item.id}
        />
        {loading ? <LoadingComponent /> : null}
      </>
    );
  };

  return (
    <>
      <Container>
        <Header title={track.track_name} navigation={props.navigation} />

        <ScrollView>
          <View style={styles.track_container}>
            <FastImage
              style={styles.img}
              source={{
                uri: track.thumbnail_url,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />

            <Text style={[styles.h2, {marginTop: 5}]}>{track.track_name}</Text>
            <Text style={[styles.h1, {marginTop: 5}]}>{track.track_desc}</Text>
            <Button name = {"Play"} onPress = {()=>{
              
              dispatch(setProperties(true, SET_PLAYING));
              dispatch(setTrack(track));
              playTrack(track,user_tracks);
              dispatch(setPlaylist(user_tracks));
              addToRecent(track)
            }}/>
            <View style = {{flexDirection:"column",alignItems:"stretch",width:"100%",marginTop:21}}>
            {renderMusic()}
            </View>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default Track;
