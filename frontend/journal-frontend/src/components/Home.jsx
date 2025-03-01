import React, {useState} from 'react'
import CreateUser from './CreateUser'
import Login from './Login'

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleFormSubmit = () => {
        setLoggedIn(true);
        setShowLogin(false);
        setShowSignup(false);
    }

    const handleLoginClick = () => {
        setShowLogin(true);        
    }

    const handleSignupClick = () => {
        setShowSignup(true);
    }


  return (
    <div className='container ' >
        <div>
            <h1 className='text-center'>JOURNAL APP</h1>
            {
                loggedIn ? <button className='btn btn-danger' onClick={() => setLoggedIn(false)}>Logout</button> : 
                <div>
                    <button className='btn btn-primary me-3' onClick={handleLoginClick}>Login</button>
                    <span>OR</span>
                    <button className='btn btn-primary ms-3' onClick={handleSignupClick}>Create Account</button> 
                    <marquee className="text-info">You need to login to use your account</marquee>
                </div>    
            }
            <div>

            </div>
        </div>
        
        {showSignup ? < CreateUser onSubmit = {handleFormSubmit}/> : null }
        {showLogin ? < Login onSubmit = {handleFormSubmit}/> : null }
        {loggedIn ? <div className='text-center'>Welcome to the journal app</div> : null}
    </div>
  )
}

export default Home
