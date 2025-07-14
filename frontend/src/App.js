
import React from "react";
import { Navigate } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './client/home';
import Login from './client/login.js'
import Register from './client/Register.js';
import OTP from "./client/otp.js";
import FOTP from "./client/Fotp.js";
import Forgetpassword from "./client/forgetPassword.js";
import ChangePassword from "./client/changePassword.js";
import Business from "./client/business.js";

import MainFeed from "./client/component/MainFeed.js";
import SidebarLayout from "./client/SidebarLayout.js";
import SearchBarExample from "./client/Search.js";
import Messaging from "./client/message.js";
import CreatePost from "./client/post.js";
import Profile from "./client/profile.js";
import Help from "./client/help.js";
import Contact from "./client/contact.js";
import PostDetail from "./client/Cpost.js";
import SearchProfile from "./client/searchProfile.js";

function App() {
  return( 
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
         <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/verify-email" element={<FOTP/>} />
        <Route path="/forget-password" element={<Forgetpassword/>} />
        <Route path="/change-password" element={<ChangePassword/>} />
        
        <Route element={<SidebarLayout />}>
          <Route path="/home" element={<Business />} />
          <Route path="/explore" element={<MainFeed />} />
          <Route path="/search" element={<SearchBarExample/>} />
          <Route path="/chat" element={<Messaging/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/help" element={<Help/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/post/:username/:post_id" element={<PostDetail/>} />
          <Route path="/userProfile/:username" element={<SearchProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;