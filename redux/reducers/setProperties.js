const initialState = {
  track_playing: false,
};

const setProperties = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYING':
      let data = Object.assign({}, state, {
        track_playing: action.payload,
      });
      return data;
    default:
      return state;
  }
};

export default setProperties;
