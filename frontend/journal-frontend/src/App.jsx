import { useState } from 'react'
import CreateUser from './components/CreateUser'

import Login from './components/Login'
import Home from './components/Home'
//import './App.css'

function App() {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [userName, setUserName] = useState("");

    const handleFormSubmit = (userName) => {
        setLoggedIn(true);
        setShowLogin(false);
        setShowSignup(false);
        setUserName(userName);
    }

    const handleLogoutClick = () => {
        setLoggedIn(false);
        setUserName("");
        localStorage.removeItem('token');
    } 

    const handleLoginClick = () => {
        setShowLogin(true);        
    }

    const handleSignupClick = () => {
        setShowSignup(true);
    }


  return (
    <div className='container ' >
      <div className='header'>
        <h1 className='text-center'>JOURNAL APP</h1>
        {
            loggedIn ? <button className='btn btn-danger' onClick={handleLogoutClick}>Logout</button> : 
            <div>
                <button className='btn btn-primary me-3' onClick={handleLoginClick}>Login</button>
                <span>OR</span>
                <button className='btn btn-primary ms-3' onClick={handleSignupClick}>Create Account</button> 
                <marquee className="text-info">You need to login to use your account</marquee>
            </div>    
        }
      </div>
    
      {showSignup ? < CreateUser onSubmit = {handleFormSubmit}/> : null }
      {showLogin ? < Login onSubmit = {handleFormSubmit}/> : null }
      {loggedIn ? <div className='text-center'>
        <h2>Welcome {userName}</h2>
        { <Home userName={userName}/> }
        </div> : null}
    </div>
  )
}

export default App
