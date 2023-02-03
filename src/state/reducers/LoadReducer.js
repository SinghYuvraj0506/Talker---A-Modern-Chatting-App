

let initialState = false

 const reducer = (state = initialState,action) =>{
    if(action.type === "changeLoadingState"){
        return action.payload
    }

    else{
        return state
    }
}

export default reducer