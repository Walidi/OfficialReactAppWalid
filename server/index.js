const express = require("express");
const mysql = require ('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');  //Keeps the user logged in always (unless logged out or shut down)

const bcrypt = require('bcrypt'); //Cryption function
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json()); //Parsing Json

app.use(cors({   //Parsing origin of the front-end
   origin: ["http://localhost:3000"], 
   methods: ["GET", "POST"],
   credentials: true   //Allows cookies to be enabled
}));  

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userID",
    secret: "subscribe",    //Normally this has to be long and complex for security
    resave: false,
    saveUninitialized: false,
    cookie: {  //How long will the cookie live for?
      expires: 60 * 60 * 24, //Expires after 24 hours
    }
  }));

const db = mysql.createConnection({
     user: "webapptest2300",
     host: "den1.mysql4.gear.host",
     password: "Ww74!ab!fL6B",
     database: "webapptest2300",
});

app.post('/register', (req, res) => {

     const email = req.body.email;
     const password = req.body.password;
     const sirname  = req.body.name;
     const phoneNr  = req.body.phoneNr;

     db.query("SELECT * FROM users WHERE email = ?", (email),
     (err, result) => {
       if (result.length>0) {  //If the email from the requester already exists we send back a message and cancel the registration
         res.send({message: "Email already exists!"})
       }

       else { 
         bcrypt.hash(password, saltRounds, (err, hash) => { //Function that hashes the pasword from request

          if (err) { //Logging error in bcryption
              console.log(err);
          }

          db.query(
            "INSERT INTO users (email, password, name, phoneNr) VALUES (?,?,?,?)", 
          [email, hash, sirname, phoneNr],
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

app.get('/login', (req, res) => { //Sends response to client whether a user is logged into session or not
    if (req.session.user) {
      res.send({loggedIn: true, user: req.session.user}); //Set logged in to be true, and return user data
    } else {
      res.send({loggedIn: false});
    }
});

const verifyJWT = (req, res, next) => { //Autherizing if user is allowed
  const token = req.headers['x-access-token']

  if (!token) {//If there isnt any token
    res.send('Token needed!');
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
         if (err) {
           res.json({auth: false, message: 'Authentication failed!'});
         } else { //Else if user is verified
           req.userID = decoded.id; //Token/id is saved
           next();
         }
    });
  }
};

app.post('/isUserAuth', (req, res) => { //An endpoint for user-auth

  const token = req.body.token;

  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
    res.send({auth: false});
    } else { //Else if user is verified
    res.send({auth: true})
    }
})
});

app.post('/login', (req, res) => {

     const email = req.body.email;
     const password = req.body.password;

     db.query(
       "SELECT * FROM users WHERE email = ?;", 
     email,
     (err, result) => {
      if (err)  {
          res.send({err: err}) //Sending error to front-end
       } 

      if (result.length>0) { //Checking if username input returns a row
          bcrypt.compare(password, result[0].password, (error, response)=> {  //Comparing password input from user with hashing to the same hashed version in DB
             if (response) { //If the password input matches the hashed password, the user is logged in!
              const id = result[0].id; //Getting id of the first user of the list of users (the user retrieved)
              const token = jwt.sign({id}, "jwtSecret", { //Verifies token from user's id
                expiresIn: 300,
              })
              req.session.user = result; //Creating session for the user!
              
              res.json({auth: true, token: token, result: result}); //Passing authenticated user   (result = row = user)

             } else { //If there is no response, it means the password is wrong but username is correct!
               res.json({auth: false, message: "Wrong email/password!"});
             }
          })
        } else {    //If nothing is matched from the inputs!
          res.json({auth: false, message: "User does not exist!"});
          }
     }
   );
});

app.get('/users', verifyJWT, (req, res) => {

  db.query("SELECT id, name, email, phonenr FROM users;", 

  (err, result) => {
    if (err)  {
      res.send({err: err}) //Sending error to front-end
      console.log(err);
   }
   if (result.length>0) {
     res.send(result);
  }
  else {
    console.log(err);
  }
});
});

app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001!");
  }); //port number server is running on  