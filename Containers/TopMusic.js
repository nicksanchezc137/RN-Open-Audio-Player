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

const TopMusic = props => {
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(0);
    const user = useSelector(state => state);
    const recent_playlist = useSelector(state => state.setRecent);
    console.log('USER IS ', user);
  
    useEffect(() => {
      setLoading(true);
      fetchItems(8);
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
    const renderItem = ({item}) => <AudioTrackCard track={item} navigation = {props.navigation} playlist = {music}/>
    const renderMusic = () => {
    const   ITEM_HEIGHT = styles.audio_card.height + styles.audio_card.marginBottom;
      return (
        <>
          <FlatList
            data={music}
            renderItem={renderItem}
            initialNumToRender={8}
            windowSize  = {10}
            getItemLayout={(data, index) => (
              {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
            )}
            maxToRenderPerBatch={10 }
            keyExtractor={item => item.id}
          />
          {loading?<LoadingComponent/>:null}
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
          <Header navigation = {props.navigation} />
        
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                setFetching(true); 
              }
            }}>
            <Text style = {styles.h1}>Top This Week</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {renderMusic()}
            </View>
          </ScrollView>
        </Container>
      </>
    );
  };

export default TopMusic;
