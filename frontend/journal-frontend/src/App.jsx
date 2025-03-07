import { useState } from 'react'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import Home from './components/Home'
import { deleteUser, updateUser } from './service/UserService';
//import './App.css'

function App() {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [userName, setUserName] = useState("");
    const [updateUser, setUpdateUser] = useState(false);


    const handleFormSubmit = (userName) => {
        setLoggedIn(true);
        setShowLogin(false);
        setShowSignup(false);
        setUserName(userName);
        setUpdateUser(false);
    }

    const handleLogoutClick = () => {
        setLoggedIn(false);
        setUserName("");
        localStorage.removeItem('token');
        setUpdateUser(false);
    } 

    const handleLoginClick = () => {
        setShowLogin(true);        
    }

    const handleSignupClick = () => {
        setShowSignup(true);
    }

    const handleDeleteUser = async () => {
      try {
        deleteUser().then(
          (Response) => {
            alert("User deleted successfully")
            handleLogoutClick();
          }
        ).catch(error => {
          console.log(error)
        }
         )

      } catch (error) {
          console.error("There was an error deleting the user!", error);
      }
  }

  const handleUpdateUser = () => {
    setUpdateUser(true);
  }

  return (
    <div className='container-fluid'>
      <div className='row align-items-center py-3 mb-4 bg-primary text-white rounded'>
        <div className='col'>
          <h1 className='text-center'>JOURNAL APP</h1>
        </div>
        <div className='col text-end'>
          {
            loggedIn ? 
            <div className="btn-group">
            <button className='btn btn-danger' onClick={handleLogoutClick}>Logout</button>
            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item" onClick={handleDeleteUser}>Delete {userName}</button></li>
              <li><button className="dropdown-item" onClick={handleUpdateUser}>Update {userName}</button></li>
            </ul>
          </div> : 
              <div>
                <button className='btn btn-light me-3' onClick={handleLoginClick}>Login</button>
                <span>OR</span>
                <button className='btn btn-light ms-3' onClick={handleSignupClick}>Create Account</button> 
                <marquee className="text-warning">You need to login to use your account</marquee>
              </div>    
          }
        </div>
      </div>
    
      {showSignup ? <CreateUser onSubmit={handleFormSubmit}/> : null }
      {showLogin ? <Login onSubmit={handleFormSubmit}/> : null }
      {loggedIn ? 
        <div className='row'>
          <div className='col-3'>
            <div className='list-group'>
              <button className='list-group-item list-group-item-action'>Write Journal</button>
              <button className='list-group-item list-group-item-action'>Delete Journal</button>
              <button className='list-group-item list-group-item-action'>Update Journal</button>
              <button className='list-group-item list-group-item-action'>Get All Journals</button>
              <button className='list-group-item list-group-item-action'>Get Journal by ID</button>
            </div>
          </div>
          <div className='col-9'>
            <div className='text-center'>
              <h2>Welcome {userName}</h2>
              <Home name={userName}/>
            </div>
          </div>
        </div> : null}
        {updateUser ? <CreateUser onSubmit={handleFormSubmit} update={true} name={`${userName}`} /> : null}
        
    </div>
  )
}

export default App
