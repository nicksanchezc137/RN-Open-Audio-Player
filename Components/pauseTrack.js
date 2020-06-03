import TrackPlayer from 'react-native-track-player';

const pauseTrack = async  (track) => {
   
    await TrackPlayer.pause();
};

export {
    pauseTrack
}
