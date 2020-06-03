import TrackPlayer from 'react-native-track-player';
import {setProperties} from '../redux/actions/actions';
import {SET_PLAYING} from '../redux/actions/action_types';

const playTrack = async (track, playlist) => {
  console.log('playlist is ', playlist);
  track = {
    id: track.id,
    url: {uri: track.audio_url},
    title: track.track_name,
    artist: track.track_desc,
    artwork: {uri: track.thumbnail_url},
  };
  let queue = [];
  let check = playlist.some(item => item.id == track.id);
  if (!check) {
    //no track on playlist
    queue.push({
      id: track.id,
      url: {uri: track.audio_url},
      title: track.track_name,
      artist: track.track_desc,
      artwork: {uri: track.thumbnail_url},
    });
  }

  queue = playlist.map(item => {
    return {
      id: item.id,
      url: {uri: item.audio_url},
      title: item.track_name,
      artist: item.track_desc,
      artwork: {uri: item.thumbnail_url},
    };
  });

  console.log('playlist data is', queue);

  await TrackPlayer.add(queue);

  TrackPlayer.skip(track.id);
  await TrackPlayer.play();
};

export {playTrack};
