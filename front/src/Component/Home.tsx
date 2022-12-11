import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import Post from "./Post";
import useGetCookies from "./CookieInterface";
import COCO from "./COCO";

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

        // Update the document title using the isVisible state
        document.title = isVisible ? 'Content is visible' : 'Content is hidden';
    }, [isVisible]);
    return (
        <>

        <h1>Home</h1>
            {isVisible ? '' : <COCO/>}
            <div>
                {data ? (
                    <ul>
                        {data.map((value, index) => {
                            return (<Post key={index} {...value}/>)
                        })}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}