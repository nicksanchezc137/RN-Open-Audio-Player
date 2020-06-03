const initialState = {
    track_desc:"",
    track_name:"",
    audio_url:"",
    thumbnail_url:"",
}


const setTrack = (state = initialState, action) => {
    switch(action.type){

        case "SET_TRACK":
            return  action.payload;
        default:
            return state;
    }

}


export default setTrack;
