

let initialState = []

 const reducer = (state = initialState,action) =>{
    if(action.type === "setOnlineFriends"){
        return action.payload
    }

    else{
        return state
    }
}

export default reducer