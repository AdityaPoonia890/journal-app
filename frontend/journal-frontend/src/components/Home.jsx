import React, {useState} from 'react'
import { greet } from '../service/UserService'

const Home = () => {

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
        <h2></h2>
        <h3>{greetMessage}</h3>
    </>
  )
}

export default Home
