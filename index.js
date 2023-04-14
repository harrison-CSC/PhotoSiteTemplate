const express = require("express")
const app = express()
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require('path')
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const loginRegistrationHelper = require("./login_registration_helper.js");
const database = require("./database.js");


app.use(cors());  

app.get("/", function(req, res)
{
    res.send("Backend server running with express");
});

app.post("/tryLogin", jsonParser, async function(req, res)
{
    const queryResult = await database.login(req.body.Username, req.body.Password);
    res.json(queryResult);
});

app.post("/tryRegister", jsonParser, async function(req, res)
{
    if (loginRegistrationHelper.checkRegistration(req.body.Username, req.body.Email, req.body.Password1, req.body.Password2))
    {
        const queryResult = await database.addUser(req.body.Username, req.body.Email, req.body.Password1);
        res.json(queryResult);
    }
    else
    {
        res.json("");
    }
});

app.post("/postImage", jsonParser, multer({}).single("image"), async function(req, res)
{
    const newPhotoID = await database.getMaxPhotoID() + 1;

    const userID = await database.isTokenValid(req.body.token);

    if (userID !== -1)
    {
        const newPath = path.join(__dirname, "userPhotos") + "/" + newPhotoID + ".jpg";
        fs.writeFile(newPath, req.file.buffer, function(err){if (err) console.log(err)});

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = month + "/" + day + "/" + year;

        database.addPhoto(newPhotoID, userID, req.body.title, req.body.description, formattedDate);

        res.json("Image posted!");
    }
    else
    {
        res.json("Sorry, backend error occured. Please log out, log in, and try again.");
    }
});

app.post("/postComment", jsonParser, async function(req, res)
{
    const userID = await database.isTokenValid(req.body.token);

    if (userID !== -1)
    {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = month + "/" + day + "/" + year;

        await database.addComment(userID, req.body.photoID, req.body.commentText, formattedDate);
        res.json("");
    }
    else
    {
        res.json("Sorry, backend error occured. Please log out, log in, and try again.");
    }
});

app.post("/printAllUsers", async function(req, res)
{
    database.printAllUsers();
});

app.post("/printAllPhotos", async function(req, res)
{
    database.printAllPhotos();
});

app.post("/printAllComments", async function(req, res)
{
    database.printAllComments();
});

app.post("/fetchImages", async function(req, res)
{
    const allPhotos = await database.getAllPhotos();
    res.json(allPhotos);
});

app.post("/fetchImage", jsonParser, async function(req, res)
{
    const photoID = req.body.photoID;
    const photo = await database.getPhoto(photoID);
    res.json(photo);
});

app.get("/fetchImageBackend/:pic", function(req, res)
{
    const photoID = req.params.pic;
    const photoPath = path.join(__dirname, "userPhotos") + "/" + photoID + ".jpg"
    res.sendFile(photoPath);
});

app.post("/fetchPhotoComments/:pic", async function(req, res)
{
    const photoID = req.params.pic;
    const comments = await database.getPhotoComments(photoID);
    res.json(comments);
});

app.listen(3001);