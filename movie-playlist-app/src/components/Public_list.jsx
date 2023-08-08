import React ,{useState,useEffect}from 'react'
import './home_style.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Instance from './AxiosInstance'

const Public_list = () => {
    const [PData, setPData] = useState()

    const getPublicData = async () => {
        const authToken = localStorage.getItem("authToken")
        if(authToken){
           const response = await Instance.get("/create_public/",{
                headers:{
                    Authorization:`Token ${authToken}`
                }
            })
            const data = response.data;
            const dataObj = Object.values(data)
            console.log(dataObj)
            setPData(dataObj)
        }
    }
    useEffect(() => {
        getPublicData()
    },[])

    const delete_item = async (id) => {
        try{
            const response = await Instance.delete(`/deletePublicItem/${id}/`)  
            getPublicData()
            window.alert(response.data.success)
        }catch(error){
            console.error(error);
        }
    }
  return (
    <>
    <Navbar />
<button style={{width:100,padding:'10px',backgroundColor:'cadetblue'}}></button>
<div className="container">
<div className="data">
<div className="page-container">
      <ul>
        <Link to='/'><li>Home</li></Link>  
        <Link to='/private'><li>Private list</li></Link>
        <Link to='/getallPublicData'><li>View User</li></Link>
      </ul>
     </div>
<div className="card-data">
<ul className='card-container'>
{Array.isArray(PData) ? (
PData.map((item, index) => (
<li key={index}>
  <div className="card">
  <div className='card-image'>
    <img src={item.Poster} alt={item.Title} />
  </div>
  <div className="card-theme">
      {item.imdb}
  <div className="title">
      <p>{item.Title}</p>
    </div>
    <div className="year">
      <p>{item.Year}</p>
    </div>
    <div className='type'>
      <p>{item.Type}</p>
    </div>
  </div>
  <div className="delete-button">
      <button onClick={() => delete_item(item.id)}>Delete</button>
  </div>
  </div>
</li>
))
) : (
<p>No private data available. Are You loggedin?  <Link to='/login'>Login</Link></p>
)}
</ul>
</div>
</div>
</div>

</>
  )
}

export default Public_list