const express = require("express");
const app = express();
const mysql = require ('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');  //Keeps the user logged in always (unless logged out or shut down)

const bcrypt = require('bcrypt'); //Cryption function
const saltRounds = 10;

app.use(cors());  //Now you can make requests!
app.use(express.json()); //Parsing Json

const db = mysql.createConnection({
     user: "webapptest2300",
     host: "den1.mysql4.gear.host",
     password: "Ww74!ab!fL6B",
     database: "webapptest2300",
});

app.post('/register', (req, res) => {

     const username = req.body.username;
     const password = req.body.password;
     const sirname  = req.body.name;
     const phoneNr  = req.body.phoneNr;

     db.query("SELECT * FROM users WHERE username = ?", (username),
     (err, result) => {
       if (result.length>0) {  //If the username from the requester already exists we send back a message and cancel the registration
         res.send({message: "Username already exists!"})
       }

       else { 
         bcrypt.hash(password, saltRounds, (err, hash) => { //Function that hashes the pasword from request

          if (err) { //Logging error in bcryption
              console.log(err);
          }

          db.query(
            "INSERT INTO users (username, password, name, phoneNr) VALUES (?,?,?,?)", 
          [username, hash, sirname, phoneNr],
          (err, result) => {
             res.send({err: err});
             console.log(err);
          }
        );
         })
       }
     }
     ) 
});

app.post('/login', (req, res) => {

     const username = req.body.username;
     const password = req.body.password;

     db.query(
       "SELECT * FROM users WHERE username = ?;", 
     username,
     (err, result) => {
      if (err)  {
          res.send({err: err}) //Sending error to front-end
       } 

      if (result.length>0) { //Checking if username input returns a row
          bcrypt.compare(password, result[0].password, (error, response)=> {  //Comparing password input from user with hashing to the same hashed version in DB
             if (response) { //If the password input matches the hashed password, the user is logged in!
              res.send(result);
             } else { //If there is no response, it means the password is wrong but username is correct!
               res.send({message: "Wrong username/password!"});
             }
          })
        } else {    //If nothing is matched from the inputs!
          res.send({ message: "User does not exist!"});
          }
     }
   );
});

app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001!");
  }); //port number server is running on  
  
      