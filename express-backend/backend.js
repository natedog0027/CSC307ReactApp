// Main file for backend. The equivalend in frontend is the index.js. Just renamed to reduce confusion
import express from "express";

const app = express(); //Creates an instance of express called "app"
const port = 8000; //Port number to listen to incoming http request

app.use(express.json()); //Tells express to process incoming data in JSON format

// Sets up the first API endpoint with GET functionality which is triggered with a "/" (the URL pattern that maps to this endpoint)
app.get("/", (req, res) => { // req and res are objects that allow us to process the request and response of the get funcition
    res.send("Hello World!!"); //This is the message we are sending back as response
});

// This tells the backend server to listen for incoming http request on the assigned port number
app.listen(port, () => {
    console.log("Example app listening at http://localhost:${port}");
});
