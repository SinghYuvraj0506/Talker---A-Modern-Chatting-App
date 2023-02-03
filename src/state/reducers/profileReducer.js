

let initialState = {bool:false}

 const reducer = (state = initialState,action) =>{
    if(action.type === "changeProfileData"){
        return action.payload
    }

    else{
        return state
    }
}

export default reducer