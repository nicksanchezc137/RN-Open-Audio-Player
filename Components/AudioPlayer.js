import React, {useState, useEffect} from 'react';
import TrackPlayer, {
  useTrackPlayerProgress,
  TrackPlayerEvents,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import styles from '../Containers/Styles';
import {View, TouchableOpacity, Slider, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player';
import {useSelector, useDispatch} from 'react-redux';
import {setProperties, setTrack, setPlaylist} from '../redux/actions/actions';
import {SET_PLAYING} from '../redux/actions/action_types';

const AudioPlayer = props => {
  const [player_state, setPlayerState] = useState(false);
  const [current_progress, setProgress] = useState(false);
  const is_playing = useSelector(
    state => state.rootReducer.setProperties.track_playing,
  );
  const playlist = useSelector(state => state.rootReducer.setPlaylist);

  const progress = useTrackPlayerProgress();
  const DURATION = progress.duration;
  const dispatch = useDispatch();
  useEffect(() => {
    // start();
    //console.log('the data is ',playlist)
    init();
  }, []);

  const ProgressBar = props => {
    //  console.log('chanig the value if track', DURATION, progress.position);
    //console.log(progress.position)
    if (DURATION == progress.position) {
      // console.log('am at the end of the track');
      setPlayerState(false);
      TrackPlayer.seekTo(0);
    }
    return (
      <View>
        <Slider
          onValueChange={props.onValueChange}
          value={progress.position}
          style={styles.progress}
          maximumValue={DURATION}
          step={1}
          minimumTrackTintColor="#FC0254"
          maximumTrackTintColor="#ffffff"
          thumbTintColor="#fff"
        />
      </View>
    );
  };
  const init = async () => {
    await TrackPlayer.setupPlayer().then(async()=>{
      TrackPlayer.addEventListener("remote-play", () => {
        console.log("clickklik---play");
        TrackPlayer.play();
      });

      TrackPlayer.addEventListener("remote-pause", () => {
        console.log("clickklik---pause");
        TrackPlayer.pause();
      });
      TrackPlayer.addEventListener("remote-stop", () => {
        console.log("clickklik");
        TrackPlayer.destroy();
      });

      TrackPlayer.addEventListener("remote-next", () => {
        console.log("clickklik-----skip");
        TrackPlayer.skipToNext();
      });
      TrackPlayer.addEventListener("remote-previous", () => {
        console.log("clickklik----previous");
        TrackPlayer.skipToNext();
      });

      
    })
    let options = {
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      ],
      notificationCapabilities:[
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_PLAY
      ],
      
      
    }
    await TrackPlayer.updateOptions(options)
    //addTrack();
  };
  const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
    TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  ];

  useTrackPlayerEvents(events, event => {
    console.log('the event is ', event);
    if (event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      //TRACK CHANGE

      let track_id = event.nextTrack;
      if (track_id) {
        let track_obj = playlist.filter(item => item.id == track_id);
        console.log(track_obj);
        dispatch(setTrack(track_obj[0]));
      }
    }
  });

  function readableTime(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = '';

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  const play = async () => {
    // Set up the player
    dispatch(setProperties(true, SET_PLAYING));
    // Start playing it
    await TrackPlayer.play();
  };

  const pause = async () => {
    dispatch(setProperties(false, SET_PLAYING));
    // Pause
    await TrackPlayer.pause();
  };

  const skip = async val => {
    if (val == 'next') {
      await TrackPlayer.skipToNext();
      let track_id = await TrackPlayer.getCurrentTrack();
      let track_obj =   await TrackPlayer.getTrack(track_id);///playlist.filter(item => item.id == track_id);
      console.log(track_obj);
      dispatch(setTrack({
        id:track_obj .id,
        audio_url:track_obj.artwork.uri,
        thumbnail_url:track_obj.url,
        track_name:track_obj.title,
        track_desc:track_obj.artist

      }));
      //  console.log("THE REAK IS ",track_obj[0])
    } else {
      await TrackPlayer.skipToPrevious();
      let track_id = await TrackPlayer.getCurrentTrack();
      let track_obj =   await TrackPlayer.getTrack(track_id);///playlist.filter(item => item.id == track_id);
      console.log(track_obj);
      dispatch(setTrack({
        id:track_obj.id,
        audio_url:track_obj.artwork.uri,
        thumbnail_url:track_obj.url,
        track_name:track_obj.title,
        track_desc:track_obj.artist

      }));
      //  console.log("THE REAK IS ",track_obj[0])
    }
  };
  const seek = async val => {
    if (val == 'forward') {
      await TrackPlayer.seekTo(progress.position + 20);
    } else {
      await TrackPlayer.seekTo(progress.position - 20);
    }
  };

  const onValueChange = x => {
    console.log(x);
    TrackPlayer.seekTo(x);
  };
  return (
    <>
      <View style={styles.progress_container}>
        <Text style={styles.h3}>{readableTime(progress.position)}</Text>
        <ProgressBar onValueChange={onValueChange} />
        <Text style={styles.h3}>{readableTime(DURATION)}</Text>
      </View>
      <View style={styles.audio_player}>
        <TouchableOpacity onPress={() => skip('back')} style={styles.back_btn}>
          <Icon name="step-backward" color="#cfcfcf" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => seek('backword')}
          style={styles.backward}>
          <Icon name="backward" color="#cfcfcf" size={24} />
        </TouchableOpacity>

        {is_playing ? (
          <TouchableOpacity onPress={() => pause()}>
            <Icon name="pause" color="#cfcfcf" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => play()}>
            <Icon name="play" color="#cfcfcf" size={25} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => seek('forward')}
          style={styles.forward}>
          <Icon name="forward" color="#cfcfcf" size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => skip('next')} style={styles.next_btn}>
          <Icon name="step-forward" color="#cfcfcf" size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AudioPlayer;
//step-forward
