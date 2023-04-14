import "./Widgets.css";

function Navbar(props)
{

    function tryLogin()
    {
        const confirmResult = window.confirm("Are you sure you want to log out?");
        if (confirmResult)
        {
            delete localStorage.accessToken;
            window.location.href = "/";
        }
    }

    if (localStorage.getItem("accessToken") === null)
    {
        return (
            <div id="navbar">
                <a href="/" class="navbarLink">Home</a>
                <a href="/post" class="navbarLink">Post</a>
                <a href="/login" class="navbarLink">Login</a>
                <a href="/register" class="navbarLink">Register</a>
                <a href="/debug" class="navbarLink">Debug</a>
            </div>
        )
    }
    else
    {
        return (
            <div id="navbar">
                <a href="/" class="navbarLink">Home</a>
                <a href="/post" class="navbarLink">Post</a>
                <button class="navbarLink" id="navbarLogout" onClick={tryLogin}>Logout</button>
                <a href="/debug" class="navbarLink">Debug</a>
            </div>
        )
    }

}

export default Navbar;
