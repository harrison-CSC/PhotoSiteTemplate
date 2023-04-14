const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb://localhost:27017"

function getDate()
{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return "(" + hours + ":" + minutes + ":" + seconds + ")";
}

async function printAllUsers()
{
    console.log("mongodb: Attempting printAllUsers() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("users");

        const results = coll.find();
        await results.forEach(console.log);
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function addUser(username, email, password)
{
    console.log("mongodb: Attempting addUser() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("users");

        const results = await coll.find({ "username": username }).toArray();

        if (results.length != 0)
            return "";            

        const hashPass = await bcrypt.hash(password, 5);

        const id = await getMaxID() + 1;

        const token = generateAccessToken();

        const toInsert = {"ID": id, "username": username, "email": email, "password": hashPass, "token": token};
        const result = await coll.insertOne(toInsert);
        
        return token;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function login(username, password)
{
    console.log("mongodb: Attempting login() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("users");

        const results = await coll.find({ "username": username }).toArray();

        if (results.length != 0)
        {
            const match = await bcrypt.compare(password, results[0].password);

            if (match)
            {
                const newToken = generateAccessToken();
                const updateDoc = { $set: { token: newToken } };

                await coll.updateOne({ "username": username }, updateDoc);

                return newToken;
            }
            else
            {
                return "";
            }
        }
        else
            return "";
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function getMaxID()
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("users");

        const results = await coll.find().toArray();

        let currentHighest = 0;

        for (let i = 0; i < results.length; i++)
        {
            if (results[i]["ID"] > currentHighest)
                currentHighest = results[i]["ID"];
        }

        return currentHighest;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function addPhoto(photoID, userID, title, description, formattedDate)
{
    console.log("mongodb: Attempting addPhoto() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("photos");

        const username = await usernameFromUID(userID);

        const toInsert = {
            "photoID": photoID, "userID": userID, "username": username, 
            "title": title, "description": description, "formattedDate": formattedDate
        };

        const result = await coll.insertOne(toInsert);
        
        return true;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function getMaxPhotoID()
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("photos");

        const results = await coll.find().toArray();

        let currentHighest = 0;

        for (let i = 0; i < results.length; i++)
        {
            if (results[i]["photoID"] > currentHighest)
                currentHighest = results[i]["photoID"];
        }

        return currentHighest;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function getPhoto(photoID)
{
    console.log("mongodb: " + getDate()  + " Attempting getPhoto() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("photos");
        
        const results = await coll.find({ "photoID": parseInt(photoID) }).toArray();
        
        return results[0];
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function getAllPhotos()
{
    console.log("mongodb: " + getDate()  + " Attempting getAllPhotos() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("photos");

        const results = await coll.find().toArray();
        return results;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function printAllPhotos()
{
    console.log("mongodb: " + getDate() + " Attempting printAllPhotos() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("photos");

        const results = coll.find();
        await results.forEach(console.log);
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function isTokenValid(token)
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("users");

        const results = await coll.findOne({ "token": token });

        if (results == null)
            return -1;
        else
            return results.ID;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function usernameFromUID(ID)
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("users");

        const results = await coll.findOne({ "ID": ID });
        
        return results.username;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function addComment(userID, photoID, comment, formattedDate)
{
    console.log("mongodb: " + getDate() + " Attempting addComment() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("comments");

        const username = await usernameFromUID(userID);

        const toInsert = {"userID": userID, "username": username, "photoID": parseInt(photoID), "comment": comment, "formattedDate": formattedDate};
        await coll.insertOne(toInsert);
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function getPhotoComments(photoID)
{
    console.log("mongodb: " + getDate() + " Attempting getPhotoComments() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("comments");
        
        const results = await coll.find({ "photoID": parseInt(photoID) }).toArray();
        
        return results;
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

async function printAllComments()
{
    console.log("mongodb: " + getDate() + " Attempting printAllComments() call");
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        var db = client.db("photoSite");

        const coll = db.collection("comments");

        const results = coll.find();
        await results.forEach(console.log);
    }
    catch (ex)
    {
        console.log(ex);
    }
    finally
    {
        client.close();
    }
}

function generateAccessToken()
{
    let toReturn = "";
    let allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i <= 16; i++)
        toReturn += allChars.charAt(Math.random() * 62);
    
    return toReturn
}

module.exports = { printAllUsers, addUser, login, addPhoto, getPhoto, getAllPhotos,
    printAllPhotos, getMaxPhotoID, addComment, getPhotoComments, printAllComments, generateAccessToken,
    isTokenValid
};