import { useState } from 'react'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import Home from './components/Home'
import Journals from './components/Journals'
import { deleteJOurnal, deleteUser, getJournalById, getJournals, updateUser } from './service/UserService';
import Input from './components/Input'
import CreateJournal from './components/CreateJournal'
//import './App.css'

function App() {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [userName, setUserName] = useState("");
    const [updateUser, setUpdateUser] = useState(false);
    const [showAllJournals, setShowAllJournals] = useState(false);
    const [journals, setJournals] = useState([]);
    const [showJournal, setShowJournal] = useState(false);
    const [postJournal, setPostJournal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);

    const handleSignup = () => {
        setShowLogin(false);
        setShowSignup(false);
        setLoggedIn(false);
        setUpdateUser(false);
        setShowAllJournals(false);
        setShowJournal(false);
        setPostJournal(false);
        }


    const handleLogin = (userName) => {
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
        setShowAllJournals(false);
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
    setShowAllJournals(false);
    setShowJournal(false);
    setUpdateUser(true);
  }

  const getJournal = (id) => {
    setUpdateUser(false);
    getJournalById(id).then(
      (response) => {
        setShowJournal(false);
        setShowAllJournals(false);
        setJournals([]);
        getAllJournals([response.data]);
      }
    ).catch(error => 
      console.log("error in get journal"+error)       
    )
  }
  const getAllJournals = (journal) => {
    
    setUpdateUser(false);
    setShowJournal(false);
    setPostJournal(false);

    if (journal) {
      setJournals(journal);
      setShowAllJournals(true
      );
      

    } else {
      
      getJournals().then(
        (response) => {
          setJournals(response.data); // Update the state with the fetched journals
          setShowAllJournals(true);
        }
      ).catch(error => {
        console.log("error in get all journals"+error)
      })

    }
    
  }

  const handleWriteJournal = () => {
    setUpdateUser(false);
    setShowAllJournals(false);
    setShowJournal(false);
    setPostJournal(true);

  }

  const postSubmit = () => {
    setEdit(false);
    setPostJournal(false);
    getAllJournals();
  }

  const handleEdit = (id) => {
    console.log(id);
    setShowAllJournals(false);
    setUpdateUser(false);
    setShowJournal(false);
    setEdit(true);
    setId(id);
    setPostJournal(true);
  }

  const handleDelete = (id) => {
    deleteJOurnal(id).then(
      (response) => {
        alert("Journal deleted successfully")
        getAllJournals();
      }
    ).catch(error => {
      console.log("error in delete journal"+error)
    }
    )
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
    
      {showSignup ? <CreateUser onSubmit={handleSignup}/> : null }
      {showLogin ? <Login onSubmit={handleLogin}/> : null }
      {loggedIn ? 
        <div className='row mb-5'>
          <div className='col-3'>
            <div className='list-group'>
 {/*             <button className='list-group-item list-group-item-action' onClick={()=> handleWriteJournal()}>Write Journal</button>

              <button className='list-group-item list-group-item-action' onClick={() => getAllJournals()}>Get All Journals</button>
              <button className='list-group-item list-group-item-action' onClick={() => setShowJournal(true)}>Get Journal by ID</button>*/}
<button className='btn btn-primary mb-1' onClick={()=> handleWriteJournal()}>Write Journal</button>

<button className='btn btn-primary mb-1' onClick={() => getAllJournals()}>Get All Journals</button>
<button className='btn btn-primary mb-1' onClick={() => setShowJournal(true)}>Get Journal by ID</button>
            </div>
          </div>
          <div className='col-9'>
            <div className='text-center'>
              <h2>Welcome {userName}</h2>
              <Home name={userName}/>
            </div>
          </div>
        </div> : null}
        {updateUser ? <CreateUser onSubmit={handleLogin} update={true} name={`${userName}`} /> : null}
        {showJournal ? <Input onSubmitInput={getJournal} />: null}
        {showAllJournals ? <Journals journals={journals} handleEditRef = {handleEdit} handleDeleteRef={handleDelete}/> : null}.
        {postJournal && (<CreateJournal  onSubmit={postSubmit} id = {edit ? id : null}/> )}
        
    </div>
  )
}

export default App
