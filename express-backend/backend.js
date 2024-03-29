// This is the Controller of the MVC design pattern. It is the logic that controls the data flow into the model and updates the view whenever data changes

// Main file for backend. The equivalent in frontend is the index.js. Just renamed to reduce confusion
import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";

const users = { 
    users_list :[]
 }

const app = express(); //Creates an instance of express called "app"
const port = 8000; //Port number to listen to incoming http request
 
app.use(cors()); //Opens this backend to any request (not secure, but for practice)
app.use(express.json()); //Tells express to process incoming data in JSON format


// Sets up an API endpoint with GET functionality which is triggered with a "/" (the URL pattern that maps to this endpoint)
app.get("/", (req, res) => { // req and res are objects that allow us to process the request and response of the get function
    res.send("Hello World!!"); //This is the message we are sending back as response
});

/*/ Sets up API endpoint with GET functionality which is triggered with a "/users" (the URL pattern that maps to this endpoint).
Gets a list of user documents from the MongoDB collection.
Can get a list of all users:  http://localhost:8000/users
Can find users by name:  http://localhost:8000/users?name=Name
Can find users by job:  http://localhost:8000/users?job=Job
Can find users by name and job:  http://localhost:8000/users?name=Name&job=Job
*/
app.get("/users", async (req,res) => { // Added async so that we can use await in the function
    const name = req.query.name;
    const job = req.query.job;
  
    try{
        let result = await userServices.getUsers(name, job);  // Must await for the result to be returned from the database

        // Check if returned result is an empty array, if so, then return a 404 error
        if (Array.isArray(result) && result.length === 0) {
            res.status(404).send('Damn. Resource not found.');
        }
        else{        
            // If result is not an empty array, then return the result to the frontend
            result = {users_list: result};
            res.send(result);
        }
    }
    catch (error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

// Can find users from MongoDB by user ID:  http://localhost:8000/users/ID
app.get("/users/:id", async (req, res) => {
    const id = req.params['id']; //or req.params.id

    try{
        let result = await userServices.findUserById(id);
        // Check if returned result is an empty array, if so, then return a 404 error
        if (result === undefined || result.length == 0) {
            res.status(404).send('Damn. Resource not found.');
        }
        else{        
            // If result is not an empty array, then return the result to the frontend
            result = {users_list: result};
            res.send(result);
        }
    }
    catch (error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }    
});

/* When using post in Firefox Rested extension, you have to use a header to allow it to recognize JSON inputs.
When posting, in header name put "Content-Type" and in header value put "application/json". In request body
put the value in quotes and the name without quotes. If you use the Boomerang extension in Bing, you do not
have to put information into a header, it auto-configures for JSON post arguments. */
app.post("/users", async (req, res) => {
    let userToAdd = req.body;

    let result = await userServices.addUser(userToAdd);

    if (result === false){
        res.status(500).send("Internal Server Error");
    }
    else { res.status(201).send(userToAdd).end(); //201 indicates that the posted item has been created
    }
});

app.delete("/users/:id", (req, res) => {
    const userToDel = req.params.id;

    let result = userServices.deleteUser(userToDel);

    if (result === false){
        res.status(500).send("Internal Server Error");
    }
    else { res.status(201).send(userToDel).end(); //201 indicates that the posted item has been created
    }
});

// This tells the backend server to listen for incoming http request on the assigned port number
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`); // Use backticks ` to make js fill in the variables {}
});

function delUser(id){
    let result = users["users_list"].filter( (user) => user["id"] !== id); // let is a rewritable temporary variable
    users["users_list"] = result;
}

// exports.app = app; // This line is needed for the unit tests to work