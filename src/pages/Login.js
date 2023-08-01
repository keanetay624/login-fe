import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios, { isCancel, AxiosError } from 'axios';
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const handleClick = () => {
    axios.post('http://localhost:8080/authenticate', {
        username: 'testUser',
        password: 'pass'
      })
      .then(function (response) {
        console.log(response)
        setToken(response.data);
        // console.log(response.data)
        // if successful, route to home, save jwt into cookie
        // skipping if check
        const decoded = jwt(response.data)
        setUser(decoded)
        cookies.set("jwt_authorization", response.data, {
          expires: new Date(decoded.exp * 1000)
        })
      // otherwise stay on this page
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/home");
  }
    return <>
        <h1>Login Page</h1>
        <label for="name">Username:</label>
        <input type="text" id="name" name="name"></input>
        <label for="password">Password:</label>
        <input type="text" id="password" name="name"></input>
        <button onClick={handleClick}>Login</button>
    </>
}