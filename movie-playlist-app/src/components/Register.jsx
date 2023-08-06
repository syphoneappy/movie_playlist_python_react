import Instance from './AxiosInstance'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Register = () => {

    const [username,setusername] = useState('')
    const [password,setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState({})

    const handleRegister = async () => {
        try{
            const response = await Instance.post("/app/create_user/",{
                username: username,
                email:email,
                password:password
            })
            setMessage(response.data)
        }catch(error){
            if (error.response.status === 405){
                setMessage(error.response.data)
                console.log(error.response.data);
            }       
        }
    }
  return (
    <>
    <nav className="navbar">
    <div className="containerNav">
      <div className="navbar-brand">
        <h1>Movie Playlist</h1>
      </div>
      <div className="search-container">
      </div>
      <div className='credential'>
      <Link to="/login" className="search-button">Sign in</Link>
      </div>
    </div>
  </nav>
    <div className="container">
        <div className="form">
            <div className="user">
            <label htmlFor="">username</label>
            <input type="text" placeholder='username' value={username} onChange={(e) => setusername(e.target.value)}/>
            </div>
            <div className="email">
                <label htmlFor="email">email</label>
                <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
           <div className="password">
            <label htmlFor="password">password</label>
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div className="login_button">
            <input type="submit" value="sign-Up" onClick={handleRegister}/>
           </div>
           <div className='message'>
           {message.username && <p style={{textAlign:'center',color:'red'}}>{message.username}</p>}
            {message.Success && <p style={{textAlign:'center',color:'green'}}>{message.Success}</p>}
           </div>
        </div>
    </div>
  
    </>
  )
}

export default Register