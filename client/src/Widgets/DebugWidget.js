import "./Widgets.css";

function LoginWidget(props)
{

    async function printAllUsers()
    {
        fetch(`http://localhost:3001/printAllUsers`, { method: "post" })
    }

    async function printAllPhotos()
    {
        fetch(`http://localhost:3001/printAllPhotos`, { method: "post"})
    }
    
    async function printAllComments()
    {
        fetch(`http://localhost:3001/printAllComments`, { method: "post"})
    }

    return (
        <>
            <button class="submitButton" onClick={printAllUsers}>Print Users DB</button> 
            <button class="submitButton" onClick={printAllPhotos}>Print Photos DB</button>
            <button class="submitButton" onClick={printAllComments}>Print Comments DB</button>
        </>
    )

}

export default LoginWidget;
