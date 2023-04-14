import { createRef } from "react"
import "./Widgets.css";

function PostWidget(props)
{

    const imageRef = createRef(null);
    const titleRef = createRef(null);
    const descriptionRef = createRef(null);

    async function tryLogin()
    {
        let fData = new FormData();
        fData.append("image", imageRef.current.files[0]);
        fData.append("token", localStorage.getItem("accessToken"));
        fData.append("title", titleRef.current.value);
        fData.append("description", descriptionRef.current.value);
        const response = await fetch(`http://localhost:3001/postImage`,
        {
            method: "post",
            body: fData
        })

        const newData = await response.json();
        alert(newData);
        window.location.href = "/";
    }

    if (localStorage.getItem("accessToken") === null)
    {
        return (
            <div id="loginPrompt">
                <h1>Post Image</h1>
                <div id="postImageLoginPrompt">
                    <h2>Login to be able to post an image</h2>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div id="loginPrompt">
                <h1>Post Image</h1>
                <div class="inputGrid">
                    <p>Image</p>
                    <input type="file" ref={imageRef} accept="image/*" placeholder="Image"></input>
                    <p>Image Title</p>
                    <input type="text" ref={titleRef} placeholder="Image Title"></input>
                    <p>Image Description</p>
                    <input type="text" ref={descriptionRef} placeholder="Image Description"></input>
                </div>
                <button class="submitButton" onClick={tryLogin}>Post</button> 
            </div>
        )
    }

}

export default PostWidget;
