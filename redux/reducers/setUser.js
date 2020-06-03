const initialState = {
    name:"no name",
    email:"no email",
    phone:"",
    fuid:"",
    type:"",
    id:0
}


const setUser = (state = initialState, action) => {
    switch(action.type){

        case "SET_USER":
            return  action.payload;
        default:
            return state;
    }

}


export default setUser;
