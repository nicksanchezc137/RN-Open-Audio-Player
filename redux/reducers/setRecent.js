const initialState = []


const setRecent = (state = initialState, action) => {
    switch(action.type){

        case "SET_RECENT":
            return  action.payload;
        default:
            return state;
    }

}


export default setRecent;
