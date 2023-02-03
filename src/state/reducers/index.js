import { combineReducers } from "redux";

import friendReducer from "./friendReducer";
import optionsReducer from "./optionsReducer";
import LoadReducer from "./LoadReducer";
import profileReducer from "./profileReducer";
import onlineReducer from "./onlineReducer";

const reducers = combineReducers({
    mainChat : friendReducer,
    messageOptionsState: optionsReducer,
    LoadingState: LoadReducer,
    ProfileState: profileReducer,
    OnlineFriends:onlineReducer
})

export default reducers