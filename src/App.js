import "./App.css";
import Home from "./components/Home/Home";
import MessageState from "./context/messages/MessageState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import UserState from "./context/Auth/UserState";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FriendState from "./context/Auth/FriendState";
import Main from "./components/New UI/Main/Main";

function App() {
  return (
    <>
    <MessageState>
      <UserState>
      <FriendState>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </Router>
      </FriendState>
      </UserState>
    </MessageState>
    <ToastContainer/>
    </>
  );
}

export default App;
