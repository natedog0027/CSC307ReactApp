import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";
import axios from "axios";
// To view the console from the frontend, I have to cntrl-shift-i in browser to get to webdevtools-console

function MyApp() {
	// This sets the starting state values as an empty list
	const [characters, setCharacters] = useState([]);

	//Removes character when a "delete" button is pressed at the specified index
	function removeOneCharacter (index, charID) {
		//Uses a filter to recreate the entire table minus the removed character in the frontend
		//Also calls to the backend to remove character there as well
		const updated = characters.filter((character, i) =>{
			makeDelCall(charID);
			return i !== index
		});
		setCharacters(updated); 
	}

	function updateList(person){
		makePostCall(person).then( result => {
			console.log(result.data);
			if (result && result.status === 201) // Check if change (post) is acceptable(successful), only then add to new character into list 
				setCharacters([...characters, result.data] ); //Result.data is a response from the backend with the whole character
		});
	}

	// Call backend using axios and place response information (characters) into frontend table
	useEffect(() => {
		fetchAll().then( result => {
			if (result)
			setCharacters(result);
		});
	}, [] ); // This empty array tells react to only call this function once when the page is built. After, the info is manually updated
	
	/* Async indicates that other processes can run if this one is delayed. This is a function using axios to populate frontend
	from backend table of characters. Used on setup. */
	async function fetchAll(){
		try {
			const response = await axios.get("http://localhost:8000/users"); // await only works within async functions
			return response.data.users_list;
		}
		catch (error){
			//We're not handling errors, just logging the action into the console.
			console.log(error);
			console.log("fetchAll function failed");
			return false;
		}
	}

	// This function uses axios to post a character input to the backend from the frontend
	async function makePostCall(person){
		try {
			const response = await axios.post("http://localhost:8000/users", person);
			return response; // After updating the list, return the new list
		}
		catch (error) {
			console.log(error);
			console.log("makePostCall function failed");
			return false;
		}
	}

	async function makeDelCall(personID){
		try {
			const response = await axios.delete(`http://localhost:8000/users/${personID}`);
			return response; // After updating the list, return the new list
		}
		catch (error) {
			console.log(error);
			console.log("makeDelCall function failed");
			return false;
		}
	}

  return (
    <div classname="container">
        <Table characterData={characters}
	  		removeCharacter={removeOneCharacter} /> {
			/*Made a property (prop) "characterData" where I am passing through the variable "characters".
			"characters" has curly brackets because it is a js expression within an HTML element.*/}
		<Form handleSubmit={updateList} />	
    </div>

    /* Cannot make a second div because in each component you can only have one
    "root" element. Must make a new function for a new "root" element. I can throw
	a bunch of stuff into this div, though.
    <div>
    </div>
    */
  );
}


// Allows this component to be imported into other files or components
export default MyApp; 