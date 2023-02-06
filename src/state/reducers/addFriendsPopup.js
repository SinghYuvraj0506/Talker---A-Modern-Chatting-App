

let initialState = false

 const reducer = (state = initialState,action) =>{
    if(action.type === "setAddFriendsPopup"){
        return action.payload
    }

    else{
        return state
    }
}

export default reducer