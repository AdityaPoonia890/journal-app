import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { signup } from '../service/UserService';
import {useParams} from 'react-router-dom';


const CreateUser = ({onSubmit}) => {

    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [sentimentAnalysis, setSentimentAnalyse] = useState(null);

    const [errors, setErrors] = useState({
        userName:"",
        password:"",
        email:""
    })

    const {id} = useParams();

    useEffect(()=>{
      if (id) {

      }
    }, [])

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
        if (!email) {
            flag = false;
            errosCopy.email="email cannot be empty"
        }

        setErrors(errosCopy);
        console.log(errors)
        return flag;
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();
        if (validate()) {
          
          const user = {userName, password, email, sentimentAnalysis};
          signup(user).then(
            (Response) => {alert("user created successfully"+ Response.data)
              onSubmit();
          }
          ).catch(error => {console.log(error)
            alert("user creation failed" + error)
          })
        }
    }

    const title = () => {
      if (id) {
        return <div className='h2 text-center'>Update User</div>
      } else {
        return <div className='h2 text-center'>Create user</div>
      }
    }

  return (
    <div className='container card px-5 py-5 mt-5 col-md-6 offset-md-3 offset-md-3'>

      {
        title()
      }
        <form className='' onSubmit={onSubmitHandle} >            
          <label htmlFor="fname" className="form-label"><b>User Name</b></label>
          <input 
            type="text"
            placeholder='enter user name'
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className= {`form-control mb-3 ${errors.userName ? 'is-invalid' : ''}`}
              id="fname"/>              

          <div className="invalid-feedback mb-3">{errors.userName}</div>


          <label htmlFor="lname" className="form-label"><b>Password</b></label>
          <input 
            type="password"
            placeholder = 'enter password '
              value={password}
              onChange={e => setPassword(e.target.value)} 
              className= {`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
              id="lname"
          />

          <div className='invalid-feedback mb-3'>{errors.password}</div>


          <label htmlFor="email" className="form-label"><b>Email address</b></label>
          <input 
              type="email"
                placeholder= 'enter email ' 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className={`form-control mb-3${errors.email ? 'is-invalid' : ''}`}
                id="email"
                  aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text mb-3">We'll never share your email with anyone else.</div>

          <div className='invalid-feedback mb-3'>{errors.email}</div>

          <div><b>Want sentiment Analysis?</b></div>

          <div className="form-check">
            <input className="form-check-input" type="radio" name="sentiment-analysis" 
            value="true"
            //checked={sentimentAnalyse} 
            onChange={(e) => setSentimentAnalyse(e.target.value === "true")}
            />
            <label className="form-check-label" > Yes </label>

          </div>

         
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sentiment-analysis"
              value="false"
             // checked={sentimentAnalyse}
              onChange={(e) => setSentimentAnalyse(e.target.value === "false")}             
            />
            <label className="form-check-label" >
              No
            </label>
          </div>
          

          <div className="mb-3 form-check mt-3">
              <input type="checkbox"
              className="form-check-input"
              id="Check"
/>
              <label className="form-check-label" htmlFor="Check"><b>Agree with our privacy policies?</b></label>
          </div>

          <button 
              type="submit"
              className="btn btn-success">
                  Submit
          </button>

        </form>
        
      
    </div>
  )
}

export default CreateUser
