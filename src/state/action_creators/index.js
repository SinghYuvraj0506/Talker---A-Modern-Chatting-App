
export const changeCurrentFriend = (user) =>{
    return (dispatch) =>{
        dispatch({
            type:"changeCurrentFriend",
            payload:user
        })
    }

}

export const changeMessageOptionsState = (data) =>{
    return (dispatch) =>{
        dispatch({
            type:"changeOptionsState",
            payload:data
        })
    }

}

export const changeLoadingState = (bool) =>{
    return (dispatch) =>{
        dispatch({
            type:"changeLoadingState",
            payload:bool
        })
    }

}

export const changeProfileState = (data) =>{
    return (dispatch) =>{
        dispatch({
            type:"changeProfileData",
            payload:data
        })
    }

}

export const onlineFriends = (data) =>{
    return (dispatch) =>{
        dispatch({
            type:"setOnlineFriends",
            payload:data
        })
    }

}

export const addFrinedsPopup = (bool) =>{
    return (dispatch) =>{
        dispatch({
            type:"setAddFriendsPopup",
            payload:bool
        })
    }

}



