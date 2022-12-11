import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import LoginForm from "./Component/Security/LoginForm";
import RegisterForm from "./Component/Security/RegisterForm";
import COCO from "./Component/COCO";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/login'}>Login</NavLink>
          </li>
          <li>
            <NavLink to={'/register'}>Register</NavLink>
          </li>
          <li>
            <NavLink to={'/cookie'}>Cookie</NavLink>
          </li>
          
        </ul>
      </nav>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={'/login'} element={<LoginForm />} />
        <Route path={'/register'} element={<RegisterForm />} />
        <Route path={'/cookie'} element={<COCO/>} />
      </Routes>
    </>
  )
}

export default App