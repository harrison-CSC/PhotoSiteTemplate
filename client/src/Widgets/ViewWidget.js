import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import "./Widgets.css";

function ViewWidget(props)
{

    const [photoBox, setPhotoBox] = useState(null);

    const photoid = useParams().photoid;

    useEffect(function()
    {
        
        async function fetchData()
        {
            const response = await fetch(`http://localhost:3001/fetchImage`,
            {
                headers: {"Content-Type" : "application/json"},
                method: "post",
                body: JSON.stringify({ 
                    photoID: photoid
                })
            })
            const newData = await response.json();
            
            setPhotoBox(                    
                <div id="singlePhotoBox">
                    <img id="singlePhoto" src={"http://localhost:3001/fetchImageBackend/" + photoid} alt=""></img>
                    <h2>{"Title: " + newData["title"]}</h2>
                    <h3>{"Description: " + newData["description"]}</h3>
                    <h4>{"Posted by: " + newData["username"]}</h4>
                    <h4>{"Date: " + newData["formattedDate"]}</h4>
                </div>
            );
        }
        fetchData();
    }, [photoid]);
      

    return (
        <div id="loginPrompt">
            <h1>View Image</h1>
            {photoBox}
        </div>
    )

}

export default ViewWidget;
