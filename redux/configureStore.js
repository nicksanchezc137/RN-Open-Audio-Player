
// import devTools from "remote-redux-devtools";

import { createStore, compose,combineReducers, applyMiddleware } from 'redux';
import setUser from './reducers/setUser';
import { PersistGate, persistCombineReducers, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';
import setTrack from './reducers/setTrack';
import setRecent from './reducers/setRecent';
import setProperties from './reducers/setProperties';
import setPlaylist from './reducers/setPlaylist';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const rootReducer = combineReducers({
  setUser: setUser,
  setTrack:setTrack,
  setPlaylist:setPlaylist,
  setRecent:setRecent,
  setProperties:setProperties

});

const persistedReducer = persistCombineReducers(persistConfig, {rootReducer})


const configureStore = () => {
  const store = createStore( persistedReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
    // applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  const persistor = persistStore(store);
  
  return { persistor, store };
}


export default configureStore;



