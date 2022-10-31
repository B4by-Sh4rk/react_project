import React, { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }
    return (
        <div className="navbar">
          
        <div className="navbar__links">
          <Link onClick={logout}>LogOut</Link>
          <Link to="/about">About</Link>
          <Link to="/posts">Posts</Link>
        </div>
      </div>
    );
};

export default Navbar;