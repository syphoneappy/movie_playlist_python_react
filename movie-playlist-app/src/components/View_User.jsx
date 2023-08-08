import React, { useEffect, useState } from 'react'
import Instance from './AxiosInstance'
import Navbar from './Navbar'
import './viewuser.css'
import { Link } from 'react-router-dom'
const View_User = () => {

    const [publicdata,setData] = useState('')
    const getpublicDataupdated = async () => {
        try{
            const response = await Instance.get('/getallpublicdata/')
            const data = Object.values(response.data)
            setData(data)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        getpublicDataupdated()
    },[])

  return (
    <>
    <Navbar />
    
    <div className="container">
    <div className="data">
    <div className="page-container">
                <ul>
                <Link to='/'><li>Home</li></Link>  
                <Link to={`/private`}><li>Private list</li></Link>
          <Link to={`/public`}><li>Public list</li></Link>
                </ul>
               </div>
    
    <div className="card-data">
    <ul className='card-container'>
    {Array.isArray(publicdata) ? (
      publicdata.map((item, index) => (
        <div class="card">
          <div className='card-image'>
        <img src={item.Poster} alt="Movie Poster"></img>
        </div>
        <div class="card-content">
          <h2 class="movie-title">{item.Title}</h2>
          <p class="movie-details">
            <span class="year">Year: {item.Year}</span><p></p>
            <span class="type">Type: {item.Type}</span><p></p>
            <span class="type">User: <strong>{item.user}</strong></span>
          </p>
        </div>
      </div>
    ))) : (
      <p>No private data available. Are You loggedin?  <Link to='/login'>Login</Link></p>
    )}
    </ul>
    </div>
    </div>
    </div>

    </>
  )
}

export default View_User