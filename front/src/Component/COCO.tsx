import useGetCookies from "./CookieInterface";
import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {useNavigate} from "react-router-dom";


export interface formDataInterface {
    title: string,
    content: string
}


export default function COCO() {
    const [isVisible, setIsVisible] = useState(true);
    const cookies = useGetCookies();

    useEffect(() => {

        if(cookies.token){
            setIsVisible(false)
        }else{
            setIsVisible(true)
        }

        // Update the document title using the isVisible state
        document.title = isVisible ? 'Content is visible' : 'Content is hidden';
    }, [isVisible]);

    const [formData, setFormData] = useState<formDataInterface>({title: "",content: ""})

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch('http://localhost:1112/addPost', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer "+ cookies.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then(data => {
                if(data.status ==="success"){
                    window.location.reload()
                }else{
                    navigate("/login")
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
        <div className="post-submit-container">            
            <form onSubmit={handleSubmit}>
                <div className="post-submit-content">
                    <input placeholder="Titre du post" type="text" name="title" onChange={handleChange}/>
                    <textarea name={"content"} onChange={handleChange}></textarea>
                </div>
                <button className="btn" type="submit">Tweeter</button>
            </form>
        </div>
    );
}
