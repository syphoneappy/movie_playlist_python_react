import Home from './components/Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import Register from './components/Register';
import Private_list from './components/Private_list';
import Public_list from './components/Public_list';
import View_User from './components/View_User';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/private" element={<Private_list />} /> 
          <Route path="/public" element={<Public_list />} /> 
          <Route path="/getallPublicData" element={<View_User />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
