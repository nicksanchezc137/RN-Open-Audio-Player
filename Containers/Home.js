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
import Icon from 'react-native-vector-icons/FontAwesome5';

function Item({title}) {
  return (
    <View
      style={{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}>
      <Text style={{color: '#fff'}}>{title}</Text>
    </View>
  );
}
const Home = props => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector(state => state);
  const recent_playlist = useSelector(state => state.rootReducer.setRecent);
  console.log('RECENT IS ', recent_playlist);

  useEffect(() => {
    setLoading(true);
    fetchItems(page);
  }, []);

  useEffect(() => {
    if (!fetching) return;
    fetchItems(page);
  }, [fetching]);

  const fetchItems = page => {
    setLoading(true);
    getMusic({offset: page}).then(res => {
      if (res.length) {
        console.log('Setting music as ', res);
        setMusic(prev => [...prev, ...res]);
        // setLastID(Number(res[res.length - 1].id) + 1);
        setPage(prev => prev + 8);
        setFetching(false);
        setLoading(false);
        setLoading2(false);
      }
    });
  };
  const renderRecent = () => {
    const ITEM_HEIGHT =
      styles.audio_card.height + styles.audio_card.marginBottom;
    return (
      <>
        {recent_playlist.length ? (
          <View style={styles.playlist_title}>
            <Text style={styles.h1}>{'Recently Played'}</Text>
            <Icon
              name="arrow-right"
              color="#fff"
              size={18}
              style={styles.arrow_icon}
            />
          </View>
        ) : null}
        <FlatList
          horizontal
          data={recent_playlist}
          renderItem={renderRecentItem}
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
  const renderItem = ({item}) => (
    <AudioTrackCard
      track={item}
      navigation={props.navigation}
      playlist={music}
    />
  );
  const renderRecentItem = ({item}) => (
    <AudioTrackCard
      track={item}
      style={{marginLeft: 21}}
      navigation={props.navigation}
      playlist={music}
    />
  );
  const renderMusic = () => {
    const ITEM_HEIGHT =
      styles.audio_card.height + styles.audio_card.marginBottom;
    return (
      <>
        <FlatList
          data={music}
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
        <Header navigation={props.navigation} />

        <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              setFetching(true);
            }
          }}>
          {renderRecent()}
          <Text style={styles.h1}>Popular Music</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {renderMusic()}
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default Home;
