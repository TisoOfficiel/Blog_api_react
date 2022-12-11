import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import login_illustration from "./asset/login_illustration.jpg";
import {NavLink} from "react-router-dom";
export interface formDataInterface {
    login: string,
    password: string
}

export default function LoginForm() {
    const [formData, setFormData] = useState<formDataInterface>({ login: "", password: "" })
    const navigate = useNavigate()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:1112/login', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization": "Basic amZnbWFpbC5jb206cGFzc3dvcmQ=",
                "Content-type": "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then(json => {
                if (json.token) {
                    navigate('/')
                }
            })
    }

    const handleChange = (e: ChangeEvent) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
            }
        })
    }



    return (
        <div className="form-container">
            <div className="form-login">

                <div className="form-login-img">
                    <img className="login-illustration" src={login_illustration} alt="login representation" />
                </div>

                <form className="form-login-content" onSubmit={handleSubmit}>
                    <div className="login-input">
                        
                        <input placeholder="Login" type="text" name="login" onChange={handleChange} />
                       
                        <input placeholder="Password" type="password" name="password" onChange={handleChange} />
                    </div>
                    <p>Pas de compte ? Inscrivez-vous <NavLink to="/register" className="active">ici</NavLink></p>
                    <NavLink to="/">Retourner a la page d'accueil</NavLink>
                    <button className="btn btn-submit" type="submit">Se connecter</button>
                </form>
                
            </div>
        </div>

    )
}