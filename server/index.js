const express = require("express");
const app = express();
const mysql = require ('mysql');
const cors = require('cors')

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
        db.query(
          "INSERT INTO users (username, password, name, phoneNr) VALUES (?,?,?,?)", 
        [username, password, sirname, phoneNr],
        (err, result) => {
           res.send({err: err});
           console.log(err);
        }
      );
       }
     }
     ) 
});

app.post('/login', (req, res) => {

     const username = req.body.username;
     const password = req.body.password;

     db.query(
       "SELECT * FROM users WHERE username = ? AND password = ?", 
     [username, password],
     (err, result) => {
      if (err)  {
          res.send({err: err}) //Sending error to front-end
       } 

      if (result.length>0) { //Checking if 'actual' user exists 
          res.send(result); 
        } else {       //Sending auth-denial !
          res.send({ message: "Wrong username/password!"});
          }
     }
   );
});

app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001!");
  }); //port number server is running on  
  
      