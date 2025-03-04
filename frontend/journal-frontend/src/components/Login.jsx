import React, {useState} from 'react'
import {login} from '../service/UserService.js'

const Login = ({onSubmit}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        userName:"",
        password:""
    });

    const validate = () => {

        let flag = true;

        const errosCopy = errors;

        if (!userName) {
            flag = false;
            errosCopy.userName="user name cant be null"
        }
        if (!password) {
            flag = false;
            errosCopy.password="password cannot be null"
        }

        setErrors(errosCopy);
        console.log(errors)
        return flag;
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();

        if (validate()) {
            const user = {userName, password};
            login(user).then(
                (Response) => {alert("logged-in successfully")                   
                    onSubmit(userName);
                    console.log(Response.data)
                    localStorage.setItem('token', Response.data)
                }
            ).catch(error => {console.log(error)
                alert("Login failed")
            })
        }
       
    }    
  return (
    <div className='container card px-5 py-5 mt-5 col-md-6 offset-md-3 offset-md-3 mb-5'>
      <h2>Login</h2>

      <form className='' onSubmit={onSubmitHandle} >
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input type="text"
            className= {`form-control mb-3 ${errors.userName ? 'is-invalid' : ''}`}
            id="userName" 
            placeholder="Enter user name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
        />
          <small id="userNameHelp" className="form-text text-danger mb-3 invalid-feedback">{errors.userName}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <small id="passwordHelp" className="form-text mb-3 text-danger invalid-feedback">{errors.password}</small>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
