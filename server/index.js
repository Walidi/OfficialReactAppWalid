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
   methods: ["GET", "POST", "PUT", "PATCH"],
   credentials: true   //Allows cookies to be enabled
}));  

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "user_sid",
    secret: "secret",    //Normally this has to be long and complex for security
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {  //How long will the cookie live for?
      expires: 60 * 60 * 1000, //Expires after one hour
    }
  }));

const db = mysql.createPool({  //Consider putting these values into environment variables 
     user: "webapptest2300",
     host: "den1.mysql4.gear.host",
     password: "Ww74!ab!fL6B",
     database: "webapptest2300",
});

db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {  //Keeps pool/connection alive
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

const verifyJWT = (req, res, next) => { //Autherizing if user is allowed
  const token = req.headers['x-access-token']

  if (!token) {//If there isnt any token
    res.send({message: 'Token needed!'});
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
         if (err) {
           res.send({auth: false, message: 'Authentication failed!'});
         } else { //Else if user is verified
           req.userID = decoded.id; //Token/id is saved
           next();
         }
    });
  }
};

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

app.post('/login', async(req, res) => {

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
             expiresIn: '1h', //Token's validity expires in 1 hour. The lesser the safer
           })
           req.session.user = result; //Creating session for the user!
           res.send({auth: true, token: token, user: result}); //Passing authenticated user   (result = row = user)
           console.log("Session is: " + JSON.stringify(req.session.user));
           res.end();

          } else { //If there is no response, it means the password is wrong but username is correct!
            res.send({auth: false, message: "Wrong email/password!"});
          }
       })
     } else {    //If nothing is matched from the inputs!
       res.send({auth: false, message: "User does not exist!"});
       }
  }
);
});

app.get('/logout', (req, res) => {
  req.session.destroy();  //Kills session
  res.send("Logout success!"); //Sends response to client
});

app.post('/authenticate', (req, res) => { //An endpoint for user-auth

  const token = req.body.token;
  const userSession = req.session.user;

   jwt.verify(token, "jwtSecret", (err, decoded) => {
     
    if (err) {
    res.send({auth: false, user: "No valid token!"});
    console.log('No valid token');
    } 
    else if (userSession) {   //Verified user! < ----------------->
      res.send({auth: true, user: userSession});
      //console.log(userSession[0].name + ' is in!');
      console.log("Session is: " + JSON.stringify(req.session.user));
    }
    else   { //Else if user is not verified, we return an empty object with rejected authentication 
    res.send({auth: false, user: 'No user session!'});
    console.log('No user session');
    }
})
});


app.get('/users', verifyJWT, (req, res) => {

  db.query("SELECT id, name, email, phoneNr FROM users;", 

  (err, result) => {
    if (err)  {
      res.send({err: err}) //Sending error to front-end
      console.log(err);
   }
   if (result.length>0) {
     res.send(result);
     console.log("Session is: " + JSON.stringify(req.session.user));
  }
  else {
    console.log(err);
  }
});
});

app.patch('/updateMyProfile', verifyJWT, async(req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNr = req.body.phoneNr;
  const id = req.session.user[0].id;  //ID from user's session

  console.log("CHECKING ID: " +id);

  var updated = "UPDATE users set name = ?, email = ?, phoneNr = ? WHERE id = ?;";
  var retrieved = "SELECT * FROM users WHERE id = ?;";

  db.query(updated, [name, email, phoneNr, id],  
    (err, result) => {
    if (err)  {
      res.send({message: err}) //Sending error to front-end
      console.log(err);
   }
     if (result) {
     db.query(retrieved, id, 
     (err, resultRetrieved) => {
      if (err) {
      res.send({message: err}) //Sending error to front-end
      console.log(err);
   } else {
       req.session.user = resultRetrieved;
       res.send({user: resultRetrieved, message: "Update succesful!"});
       console.log("Session is: " + JSON.stringify(req.session.user));
       res.end();
   }
  })}
});
});

app.listen(3001, () => {
  console.log('\x1b[32m%s\x1b[0m', 'Server running on port 3001!')
}); //port number server is running on  