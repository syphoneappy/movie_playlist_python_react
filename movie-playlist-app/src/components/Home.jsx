import React, { useEffect, useState } from 'react'
import './home_style.css';
import Instance from './AxiosInstance';
import { Link } from 'react-router-dom';

const Home = () => {

const [home,setHome] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [search,setSearch] = useState('')
const [loggedin,setIsloggedIn] = useState(false)
const [notFoundMessage, setNotFoundMessage] = useState("");


const getApiData = async (page, searchQuery = null) => {

  try {
    const response = await Instance.get(searchQuery ? 'app/search/' : '/app/data/', {
      params: {
        page: page,
        ...(searchQuery && { s: searchQuery }),
      },
    });
    const data = response.data;
    const dataObj = Object.values(data);
    if (dataObj[0] == "False"){
      setHome([]); 
      setNotFoundMessage("Data not found  !. Search the Data in search Box to get result.");
    }else {
      setHome(dataObj[0]);
      setNotFoundMessage(); 
    }
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

const getSearchData = async (s,page) =>{
  try{
    const response = await Instance.get('app/search/',{
      params:{
        s:s,
        page:page
      },
    })
    const data = response.data;
    const dataObj = Object.values(data);
    if (dataObj[0] == "False"){
      setHome([]); 
      setNotFoundMessage("Data not found  !. Search the Data in search Box to get result.");

    }else {
      setHome(dataObj[0]);
      setNotFoundMessage(); 
    }
  }catch (error){
    console.error('Error fetching data',error)
  }
}
const myPrivateList = async (imdbID,Title,Poster,Year,Type) => {
  const Years = Number(Year)
  const authToken = localStorage.getItem("authToken")
  try{
    const response = await Instance.post('app/create_private/',{
      imdb:imdbID,
      Title: Title,
      Poster: Poster,
      Year: Years,
      Type: Type
    },
    {
      headers: {
        Authorization: `Token ${authToken}`
      }
    }
    )
    if(response.status === 200){
      window.alert(`The ${Type} has been added`)
    }
    else{
      console.log(response.data)
    }
  }catch(error){
    if (error.response?.status === 405){
      window.alert("You are trying to add duplicate entries")
    }
  }
}

const myPublicList = async (imdbID,Title,Poster,Year,Type) => {
  const Years = Number(Year)
  const authToken = localStorage.getItem("authToken")
  try{
    const response = await Instance.post('app/create_public/',{
      imdb:imdbID,
      Title:Title,
      Poster:Poster,
      Year:Years,
      Type:Type
    },
    {
      headers:{
        Authorization: `Token ${authToken}`
      }
    }
    )
    if(response.status === 200){
      window.alert(`The ${Type} has been added`)
    }
    else{
      console.log(response.data)
    }
  }catch(error){
    if (error.response?.status === 405){
      window.alert("You are trying to add duplicate entries")
    }
  }
}
useEffect(() => {
    getApiData(currentPage);
}, [currentPage, search]);

useEffect(() => {
  const authToken = localStorage.getItem("authToken")
  if (authToken){
    Instance.get('app/validate/',{
      headers:{
        Authorization:`Token ${authToken}`
      }
    }).then((response) => {
      if(response.status === 200){
        setIsloggedIn(true)
      }
      else{
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        console.log("No Token Found")
      }
    })
  }else{
    console.log("No Token Found")
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
})

useEffect(() => {
  if (search.trim() === '') {
    getApiData(currentPage);
  } else {
    getApiData(currentPage, search);
  }
}, [currentPage, search]);

const handleSearch = () => {
  setNotFoundMessage('');
  getSearchData(search,currentPage);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};
const handlePageClick = (page) => {
  setCurrentPage(page);
};

const userloggedout = async () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  setIsloggedIn(false)
}


  return (
    <>
          <nav className="navbar">
          <div className="containerNav">
      <div className="navbar-brand">
      <h1><Link to="/">Movie Playlist</Link></h1>
      </div>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className='credential'>
        {!loggedin ? (
          <Link to="/login" className="search-button">Sign In</Link>
        ) : (
          <a onClick={userloggedout} className="search-button">LogOut</a>  
        )}
      </div>
    </div>
    </nav>
    <div className='container'>
      <div className="data">
        {!loggedin ? (null): (
                <div className="page-container">
                <ul>
                  <li>Home</li>
                 <Link to={`/private`}><li>Private list</li></Link>
          
                 <Link to={`/public`}><li>Public list</li></Link>
                  <Link to='/getallPublicData'><li>View User</li></Link>
                </ul>
               </div> 
        )}

      <div className="card-data">
        {notFoundMessage  ? (    
          <h1 style={{color:"red",margin:'10px',textAlign:'center'}}>{notFoundMessage}</h1>
          
        ) : ( 
          <ul className='card-container'>
            {
    home.map((item, index) => ( 
        <li key={index}>
          <div className='card'>
            <div className='card-image'>
              <img src={item.Poster} alt={item.Title} />
            </div>
            <div className='card-theme'>
              <div className="title">
                <p>{item.Title}</p>
              </div>
              <div className="year">
                <p>{item.Year}</p>
              </div>
              <div className='type'>
                <p>{item.Type}</p>
              </div>
              <div className="button">
                <div className="private">
                {!loggedin ? (
                 <Link to="/login"><button>Private</button></Link>
                ):(
                  <button onClick={myPrivateList.bind(index,item.imdbID,item.Title,item.Poster,item.Year,item.Type)}>Private</button>
                  )}
                </div>
                <div className="public">
                  {!loggedin ? (
                    <Link to="/login"><button>Public</button></Link>
                  ) : (
                    <button onClick={myPublicList.bind(index,item.imdbID,item.Title,item.Poster,item.Year,item.Type)}>Public</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </li>
    ))}
          </ul>
        )}
    
  
     
     </div>
     </div>
     
     <div className="pagination">
      
    
     <a  onClick={handlePrevPage} className="prev">
          &laquo; Previous
        </a>
  {[1, 2, 3, 4, 5].map((page) => (
          <a
            key={page}
            onClick={() => handlePageClick(page)}
            className={`page ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </a>
        ))}
          <a onClick={handleNextPage} className="next">
          Next &raquo;
        </a>
</div>

    </div>
    
    </>
  )
}

export default Home