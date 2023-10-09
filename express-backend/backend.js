// Main file for backend. The equivalend in frontend is the index.js. Just renamed to reduce confusion
import express from "express";

const app = express(); //Creates an instance of express called "app"
const port = 8000; //Port number to listen to incoming http request

// Users list in the form of a JSON object
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 
app.use(express.json()); //Tells express to process incoming data in JSON format

// Sets up the first API endpoint with GET functionality which is triggered with a "/" (the URL pattern that maps to this endpoint)
app.get("/", (req, res) => { // req and res are objects that allow us to process the request and response of the get funcition
    res.send("Hello World!!"); //This is the message we are sending back as response
});

app.get("/users", (req,res) => {
    res.send(users);
})

// This tells the backend server to listen for incoming http request on the assigned port number
app.listen(port, () => {
    console.log("Example app listening at http://localhost:${port}");
});
