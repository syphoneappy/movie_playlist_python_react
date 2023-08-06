
import {React,useState,useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';

const Navbar = ({ search, handleSearch, setSearch }) => {


    const [loggedinafter, setLoggedIn] = useState('');


    const userloggedout = async () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setLoggedIn(false)
      }

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
      }, []);

      
  return (
    <nav className="navbar">
          <div className="containerNav">
      <div className="navbar-brand">
      <h1><Link to="/">Movie Playlist</Link></h1>
      </div>
      <div className="search-container">
        
      </div>

      <div className='credential'>
        {!loggedinafter ? (
          <Link to="/login" className="search-button">Sign In</Link>
        ) : (
          <>

          <a onClick={userloggedout} className="search-button">LogOut</a>

          </>  
          
        )
      }
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
