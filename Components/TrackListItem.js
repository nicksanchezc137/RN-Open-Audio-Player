/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import FastImage from 'react-native-fast-image';
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import styles from '../Containers/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setProperties, setTrack, setPlaylist, setRecent} from '../redux/actions/actions';
import {SET_PLAYING} from '../redux/actions/action_types';
import {pauseTrack} from './pauseTrack';
import {playTrack} from './playTrack';
const TrackListItem = props => {
  const dispatch = useDispatch();
  const current_track = useSelector(state => state.rootReducer.setTrack);
  const is_playing = useSelector(
    state => state.rootReducer.setProperties.track_playing,
  );
  const recent = useSelector(state => state.rootReducer.setRecent);

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
      <View style={styles.list_contr}>
        <FastImage
          style={styles.icon_}
          source={{
            uri: props.track.thumbnail_url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.side_menu_text2}>{props.track.track_name}</Text>

        {current_track.id == props.track.id && is_playing ? (
          <TouchableOpacity
            style={styles.btn_list}
            onPress={() => {
              dispatch(setProperties(false, SET_PLAYING));
              dispatch(setTrack({}));
              pauseTrack();
            }}>
            <Icon name="pause" color="#fff" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn_list}
            onPress={() => {
              dispatch(setProperties(true, SET_PLAYING));
              dispatch(setTrack(props.track));
              dispatch(setPlaylist(props.playlist))
              playTrack(props.track,props.playlist);
              addToRecent(props.track)
            }}>
            <Icon name="play" color="#fff" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default TrackListItem;
