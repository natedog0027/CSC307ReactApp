// Main file for backend. The equivalend in frontend is the index.js. Just renamed to reduce confusion
import express from "express";

const app = express(); //Creates an instance of express called "app"
const port = 8000; //Port number to listen to incoming http request

// Users list in the form of a JSON object (const is a constant global variable)
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

// Find users by name query  http://localhost:8000/users?name=Mac
app.get("/users", (req,res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(users);
    }
})

// Can find users by user ID:  http://localhost:8000/users/zap555
app.get("/users/:id", (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

const findUserByName = (name) => {
    return users["users_list"].filter( (user) => user["name"] === name);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// Post doesn't work on Firefox Rested extension as of 10/9/23. Use Bing Boomerang extension instead
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end(); //200 is actually default response code, but this is to show how to alter response code
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete("/users/:id", (req, res) => {
    const userToDel = req.params.id;
    delUser(userToDel);
    res.status(204).end(); // 204 means request is processed (delete) but new data isn't shown until info is reloaded (get)
});

function delUser(id){
    let result = users["users_list"].filter( (user) => user["id"] !== id); // let is a rewritable variable
    users["users_list"] = result;
}

// This tells the backend server to listen for incoming http request on the assigned port number
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`); // Use backticks ` to make js fill in the variables {}
});
