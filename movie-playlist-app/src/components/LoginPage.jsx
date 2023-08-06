import React, { useState } from 'react'
import './home_style.css'
import { Link , Navigate} from 'react-router-dom'
import Instance from './AxiosInstance'


const LoginPage = () => {
    const [username, setusername] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const [loggedin,setIsloggedIn] = useState(false)
    const handlelogin = async () => {
        try{
            const response = await Instance.post("/app/login/",{
                username:username,
                password:password,
            });
            if (response.data && response.data.token){
                localStorage.setItem("authToken",response.data.token)
                localStorage.setItem("user",username)
                setIsloggedIn(true)
            }
        }catch(error){
            console.error(error)
            setMessage("Invalid Email and Password")
            setIsloggedIn(false)
        }
    }

    if (loggedin){
        return <Navigate replace to='/' />
    }

  return (
    <>
    {!loggedin ? (
        <>
        <nav className="navbar">
    <div className="containerNav">
      <div className="navbar-brand">
        <h1>Movie Playlist</h1>
      </div>
      <div className="search-container">
      </div>
      <div className='credential'>
      <Link to="/register" className="search-button">Sign Up</Link>
      </div>
    </div>
  </nav>
    <div className="container">
    <div className="form">
            <div className="user">
            <label htmlFor="">username</label>
            <input type="text" placeholder='username' value={username} onChange={(e) => setusername(e.target.value)}/>
            </div>
           <div className="password">
            <label htmlFor="password">password</label>
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div className="login_button">
            <input type="submit" value="sign-in" onClick={handlelogin}/>
           </div>
           <div className="message">
            <p style={{color:'red',textAlign:'center'}}>{message}</p>
           </div>
        </div>
    </div>
        </>
    ): null
    }
    </>
  )
}

export default LoginPage