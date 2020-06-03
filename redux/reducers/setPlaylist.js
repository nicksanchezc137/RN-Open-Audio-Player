const initialState = []


const setPlaylist = (state = initialState, action) => {
    switch(action.type){

        case "SET_PLAYLIST":
            return  action.payload;
        default:
            return state;
    }

}


export default setPlaylist;
