import './App.css';
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/Signin"
import ManageEmployees from "./pages/ManageEmployees"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element = {<Dashboard />}/>
      <Route path="/" element = {<SignIn />}/>
      <Route path="/manageEmployees" element = {<ManageEmployees />}/>
    </Routes>
  );
}

export default App;
