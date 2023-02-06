import { combineReducers } from "redux";

import friendReducer from "./friendReducer";
import optionsReducer from "./optionsReducer";
import LoadReducer from "./LoadReducer";
import profileReducer from "./profileReducer";
import onlineReducer from "./onlineReducer";
import addFriendsPopup from "./addFriendsPopup";

const reducers = combineReducers({
    mainChat : friendReducer,
    messageOptionsState: optionsReducer,
    LoadingState: LoadReducer,
    ProfileState: profileReducer,
    OnlineFriends:onlineReducer,
    addFriendsPopupState:addFriendsPopup
})

export default reducers