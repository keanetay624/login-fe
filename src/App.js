import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import {Login} from "./pages/Login"
import {Home} from "./pages/Home"
import SignIn from "./pages/Signin"

function App() {
  return (
    <Routes>
      {/* <Route path="/" element = {<Login />}/> */}
      <Route path="/home" element = {<Home />}/>
      <Route path="/" element = {<SignIn />}/>
    </Routes>
  );
}

export default App;
