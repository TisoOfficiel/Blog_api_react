import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import Post from "./Post";
import useGetCookies from "./CookieInterface";
import COCO from "./COCO";
import {NavLink} from "react-router-dom";
type Data = {
    // Add the properties and types of the data here
    id: number,
    author: string,
    title:string,
    content:string,
    created_at:string,
    updated_at:string,

};


export default function Home(){

    const mounted = useRef<boolean>(false)
    const [data, setData] = useState<Data[] | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const cookies = useGetCookies();

    useEffect(() => {
        if (!mounted.current) {

            fetch("http://localhost:1112")
                .then(response => response.json())
                .then(jsonData => setData(jsonData));
        }

        mounted.current = true
    },[])

    useEffect(() => {

        if(cookies.token){
            setIsVisible(false)
        }else{
            setIsVisible(true)
        }

    }, [isVisible]);
     
    return (
        <>
            <nav>
                <p>HETIC</p>
                <ul>
                    <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                                       
                   {isVisible ? 
                    <li>
                        <NavLink to={'/register'}>Register</NavLink>
                    </li> :  ""
                    }
                    {isVisible ? 
                      "":
                    <li>
                        <NavLink to={'/'}>Se déconnecter</NavLink>
                    </li>
                    }
                </ul>
            </nav>
            {isVisible ? '' : <COCO/>}
            <div>
                {data ? (
                    <div className="body-container">
                        {data.map((value, index) => {
                            return (<Post key={index} {...value}/>)
                        })}
                    </div>
                ) : (
                    <p>Loading post...</p>
                )}
            </div>
        </>
    )
}