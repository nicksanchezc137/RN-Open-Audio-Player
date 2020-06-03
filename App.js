import React from 'react';
import Navigator from './Containers/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import AudioPlayer from './Components/AudioPlayer';

//redux setup

function App() {
  const {persistor, store} = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
        <AudioPlayer />
      </PersistGate>
    </Provider>
  );
}

export default App;
