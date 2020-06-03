import FastImage from 'react-native-fast-image';
import {
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../Containers/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {playTrack} from './playTrack';
import {setProperties, setTrack, setPlaylist, setRecent} from '../redux/actions/actions';
import {SET_PLAYING} from '../redux/actions/action_types';
import { pauseTrack } from './pauseTrack';
import TrackPlayer from 'react-native-track-player'

const AudioTrackCard = props => {
  const dispatch = useDispatch();
  const current_track = useSelector(state => state.rootReducer.setTrack);
  const is_playing = useSelector((state) => state.rootReducer.setProperties.track_playing);
  const recent = useSelector(state => state.rootReducer.setRecent);
 
  useEffect(()=>{
    console.log('    is ',props.playlist)
  },[])

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
 
  return (
    <>
      <View style={[styles.audio_card, props.style]}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Track', {track: props.track});
          }}>
          <FastImage
            style={styles.img}
            source={{
              uri: props.track.thumbnail_url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <View style={styles.text_cntr}>
          <Text style={styles.track_name}>{props.track.track_name}</Text>
          <Text style={styles.track_desc}>{props.track.track_desc}</Text>
        </View>

        {current_track.id == props.track.id && is_playing?  (
          <TouchableOpacity
            style={styles.play_icon}
            onPress={() => {
              dispatch(setProperties(false, SET_PLAYING));
              dispatch(setTrack({}));
              pauseTrack();
            }}>
            <Icon name="pause" color="#fff" size={15} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.play_icon}
            onPress={() => {
              dispatch(setProperties(true, SET_PLAYING));
              dispatch(setTrack(props.track));
              playTrack(props.track,props.playlist);
              dispatch(setPlaylist(props.playlist));
              addToRecent(props.track)
            }}>
            <Icon name="play" color="#fff" size={15} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
   
};

export default AudioTrackCard;
