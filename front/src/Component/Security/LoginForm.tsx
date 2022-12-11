import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
export interface formDataInterface {
    login: string,
    password: string
}

export default function LoginForm(){
    const [formData, setFormData] = useState<formDataInterface>({login: "",password: ""})
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="login">Username</label>
            <input type="text" name="login" onChange={handleChange}/>
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange}/>
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
}