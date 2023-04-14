import { useEffect, useState, createRef } from "react"
import {useParams} from 'react-router-dom'
import "./Widgets.css";

function PhotoCommentWidget(props)
{

    const commentRef = createRef("");
    const photoid = useParams().photoid;
      
    const [commentBoxArr, setCommentBoxArr] = useState(null);


    useEffect(function()
    {
        async function fetchData()
        {
            const response = await fetch(`http://localhost:3001/fetchPhotoComments/` + photoid, { method: "post" })
            const newData = await response.json();

            let tempCommentBox = [];

            for (let i = 0; i < newData.length; i++)
            {
                tempCommentBox.push(
                    <div class="commentBox">
                        <h2>{newData[i]["username"] + " says: "}</h2>
                        <h3>{newData[i]["comment"]}</h3>
                        <p class="commentBoxDate">{"Posted: " + newData[i]["formattedDate"]}</p>
                    </div>
                );
            }
            setCommentBoxArr(tempCommentBox);
        }
        fetchData();
    }, [photoid]);
    
    async function tryPostComment()
    {
        const response = await fetch(`http://localhost:3001/postComment`,
        {
            headers: {"Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({ 
                token: localStorage.getItem("accessToken"),
                photoID: photoid,
                commentText: commentRef.current.value
            })
        })

        const newData = await response.json();
        window.location.reload();
    }

    if (localStorage.getItem("accessToken") === null)
    {
        return (
            <>
                <h1>Comments</h1>
                <ul id="commentBoxUL">
                    {commentBoxArr}
                </ul>
                <div class="commentBox" id="submitCommentBox">
                    <h2>Login to be able to comment</h2>
                </div>
            </>
        )
    }
    else
    {
        return (
            <>
                <h1>Comments</h1>
                <ul id="commentBoxUL">
                    {commentBoxArr}
                </ul>
                <div class="commentBox" id="submitCommentBox">
                    <h2>Add your comment:</h2>
                    <input type="text" ref={commentRef} placeholder="Your Comment" id="commentInput"></input>
                    <button class="submitButton" onClick={tryPostComment}>Submit</button> 
                </div>
            </>
        )
    }

}

export default PhotoCommentWidget;
