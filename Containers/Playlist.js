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
import {Api} from '../services/Api';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Playlist = props => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylistArray] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [playlist, setPlaylist] = useState({title: 'Add To Playlist'});
  const user = useSelector(state => state.rootReducer.setUser);

  useEffect(() => {
    setLoading(true);
    getAllPlaylists(page);
    //clean up
  }, []);

  useEffect(() => {
    if (!fetching) return;
    getAllPlaylists(page);
  }, [fetching]);

  const renderPlaylistItem = playlist => {
    const ITEM_HEIGHT =
      styles.audio_card.height + styles.audio_card.marginBottom;
    return (
      <>
        <View style={styles.playlist_title}>
          <Text style={styles.h1}>{playlist.name}</Text>
          <Icon
            name="arrow-right"
            color="#fff"
            size={18}
            style={styles.arrow_icon}
          />
        </View>

        <FlatList
          horizontal
          data={playlist.tracks}
          renderItem={({item}) =>  <AudioTrackCard track={item} playlist={playlist.tracks} navigation={props.navigation}  style={{marginLeft: 21}}/>}
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
      </>
    );
  };
  const getAllPlaylists = () => {
    console.log('trying to get playlist when the page is ', page);
    try {
      let data = {
        id: user.id ? user.id : 1,
        filter: 'all',
        page: page,
        limit: 3,
      };
      console.log(
        'get all playlist dat ---------------- playlist data is ',
        data,
      );
      setLoading(true);
      Api.post('get_paged_playlists.php', data)
        .then(res => {
          console.log('data is ', res.data);
          if (res.data.status == 'Success') {
            //this.props.onComplete(data);
            setVisible2(false);
            console.log(res.data.message);
            let playlist_ = res.data.message.map(x => {
              return {id: x.id, name: x.name, tracks: JSON.parse(x.tracks)};
            });
            setPlaylistArray(prev => [...prev, ...playlist_]);
            // setLastID(Number(res[res.length - 1].id) + 1);
            setPage(prev => prev + 2);
            setLoading(false);
            setFetching(false);
          }
        })
        .catch(error => {
          console.log('Error: ', error);
          // this.setState({loading:false})
        });
    } catch (error) {
      console.log('Error', error);
      // this.setState({loading:false})
    }
  };
  const renderPlaylist = () => {
    console.log('THE PLAYLIST DATA IS ', playlists);
    return (
      <>
        <FlatList
          data={playlists}
          renderItem={({item}) => renderPlaylistItem(item)}
          initialNumToRender={8}
          windowSize={10}
          // getItemLayout={(data, index) => (
          //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          // )}
          maxToRenderPerBatch={10}
          keyExtractor={item => item.id}
        />
        {loading ? <LoadingComponent /> : null}
      </>
    );
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <>
      <Container>
        <Header title={'Playlists'} navigation={props.navigation} />

        <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              setFetching(true);
            }
          }}>
          {renderPlaylist()}
        </ScrollView>
      </Container>
    </>
  );
};

export default Playlist;
