## Photosite App Template

This project is designed to be a template of an example photosite app. This includes:

* User account registration
* Hashing user passwords
* Logged-in users can see photos, post photos, and add comments on existing photos
* Not logged-in users can see photos, but will not be able to post photos or add comments

Some of the most important tools used to make this app are:

* React - Ued to design the app around reusable modules
* Express - Provide tools for setting up the server
* MongoDB - Store the database of user accounts and photos
* bcrypt - Hashes passwords to protect user security
* Multer - Used to handle recieving photos submitted by users

This project requires:

* npm
* Mongodb

Install using `npm run init`

Run using `npm start`