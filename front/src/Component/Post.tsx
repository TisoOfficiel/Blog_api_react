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
        <div className={"post-container"}>
            <p className="post-author">@{author}</p>
            <h2 className="post-title">{title}</h2>
            <p className={"post-content"}>{content.replace("<br />","\n")}</p>
            <p className={"post-date"}>Posté le : {created_at}</p>
        </div>

    )
}