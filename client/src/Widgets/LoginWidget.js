import { createRef } from "react"
import "./Widgets.css";

function LoginWidget(props)
{

    const unameLoginRef = createRef(null);
    const pwordLoginRef = createRef(null);

    async function tryLogin()
    {
        const response = await fetch(`http://localhost:3001/tryLogin`,
        {
            headers: {"Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({ 
                Username: unameLoginRef.current.value,
                Password: pwordLoginRef.current.value
            })
        })

        const newData = await response.json();

        if (newData === "")
            alert("Sorry, invalid credentials");
        else
        {
            alert("Logged in!");
            localStorage.setItem("accessToken", newData);
            window.location.href = "/";
        }
    }
    
    return (
        <div id="loginPrompt">
            <h1>Login</h1>
            <div class="inputGrid">
                <p>Username</p>
                <input type="text" ref={unameLoginRef} placeholder="Username"></input>
                <p>Password</p>
                <input type="password" ref={pwordLoginRef} placeholder="Password"></input>
            </div>
            <button class="submitButton" onClick={tryLogin}>Login</button> 
        </div>
    )

}

export default LoginWidget;
