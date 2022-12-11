import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import register_illustration from "./asset/register_illustration.jpg";
export interface formDataInterface {
    lastname:string,
    firstname:string,
    login: string,
    password: string,
}


export default function RegisterForm(){
    const [formData, setFormData] = useState<formDataInterface>({lastname:"",firstname:"",login: "",password: ""})
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:1112/register', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Basic amZnbWFpbC5jb206cGFzc3dvcmQ=",
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then(json => {
                if(json.token){
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
            <div className="form-register">

                <div className="form-register-img">
                    <img className="register-illustration" src={register_illustration} alt="register representation" />
                </div>

                <form className="form-register-content" onSubmit={handleSubmit}>
                    <div className="register-input">
                        
                        <input placeholder="Lastname" type="text" name="lastname" onChange={handleChange}/>
                        <input placeholder="Firstname"type="text" name="firstname" onChange={handleChange}/>
                        <input placeholder="login"type="text" name="login" onChange={handleChange}/>
                        <input placeholder="password" type="password" name="password" onChange={handleChange}/>
                    </div>
                    <p>Déja un compte ? Connecter-vous <NavLink to="/login" className="active">ici</NavLink></p>
                    <NavLink to="/">Retourner a la page d'accueil</NavLink>
                    <button className="btn btn-submit" type="submit">S'inscire</button>
                </form>
                
            </div>
        </div>
    )
}