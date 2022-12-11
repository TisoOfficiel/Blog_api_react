import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import LoginForm from "./Component/Security/LoginForm";
import RegisterForm from "./Component/Security/RegisterForm";
import './App.css';
import logo from "./logo.svg";
function App() {
  return (
    <>

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={'/login'} element={<LoginForm />} />
        <Route path={'/register'} element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App