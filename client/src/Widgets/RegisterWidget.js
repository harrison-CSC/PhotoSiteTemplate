import { createRef } from "react"
import "./Widgets.css";

function RegisterWidget(props)
{     

    const unameLoginRef = createRef(null);
    const emailLoginRef = createRef(null);
    const pword1LoginRef = createRef(null);
    const pword2LoginRef = createRef(null);

    async function tryRegister()
    {
        // alert(unameLoginRef.current.value);
        // alert(emailLoginRef.current.value);
        // alert(pword1LoginRef.current.value);
        // alert(pword2LoginRef.current.value);

        const response = await fetch(`http://localhost:3001/tryRegister`,
        {
            headers: {"Content-Type" : "application/json"},
            method: "post",
            body: JSON.stringify({ 
                Username: unameLoginRef.current.value,
                Email: emailLoginRef.current.value,
                Password1: pword1LoginRef.current.value,
                Password2: pword2LoginRef.current.value
            })
        })

        const newData = await response.json();

        if (newData == "")
            alert("Sorry, that username is already taken. Please try again");
        else
        {
            alert("Account created!");
            localStorage.setItem("accessToken", newData);
            window.location.href = "/";
        }
    }
    

    return (
        <div id="registerPrompt">
            <h1>Register</h1>
            <div class="inputGrid">
                <p>Username</p>
                <input type="text" ref={unameLoginRef} placeholder="Username"></input>
                <p>Email</p>
                <input type="text" ref={emailLoginRef} placeholder="Email"></input>
                <p>Password</p>
                <input type="password" ref={pword1LoginRef} placeholder="Password"></input>
                <p>Retype Password</p>
                <input type="password" ref={pword2LoginRef} placeholder="Retype Password"></input>
            </div>
            <button class="submitButton" onClick={tryRegister}>Register</button> 
        </div>
    )

}

export default RegisterWidget;
