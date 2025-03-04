import React, {useState} from 'react'
import { greet } from '../service/UserService'

const Home = ({userName}) => {

    const [greetMessage, setGreetMessage] = useState("");

    greet().then(
        (response) => {
            setGreetMessage(response.data)
        }
    ).catch(error => {
        console.log(error)
    })

  return (
    <>
        <h2>Home</h2>
        <h3>{greetMessage}</h3>
    </>
  )
}

export default Home
