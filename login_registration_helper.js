
function checkRegistration(username, email, password1, password2)
{
    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)))
        return false;
    if (password1 != password2)
        return false;

    return true;
}

module.exports = { checkRegistration };