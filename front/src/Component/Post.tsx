export interface Props{
    id: number,
    author: string,
    title:string,
    content:string,
    created_at:string,
    updated_at:string,
}

export default function Post({id,title, content,author,created_at,updated_at}:Props){
    return(
        <div>
            <p>{title}</p>
            <p>{content}</p>
            <p>{author}</p>
            <p>{created_at}</p>
        </div>

    )
}