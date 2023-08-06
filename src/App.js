import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/Signin"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element = {<Dashboard />}/>
      <Route path="/" element = {<SignIn />}/>
    </Routes>
  );
}

export default App;
