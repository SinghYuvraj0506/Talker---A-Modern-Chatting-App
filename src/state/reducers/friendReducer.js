

let initialState = {}

 const reducer = (state = initialState,action) =>{
    if(action.type === "changeCurrentFriend"){
        return action.payload
    }

    else{
        return state
    }
}

export default reducer