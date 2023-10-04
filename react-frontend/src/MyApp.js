import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
	// This sets the starting state values as these 4 characters
	const [characters, setCharacters] = useState([]);

	//Removes character when a "delete" button is pressed at the specified index
	function removeOneCharacter (index) {
		//Uses a filter to recreate the entire table minus the removed character
		const updated = characters.filter((character, i) => {
			return i !== index
		});
		setCharacters(updated); 
	}

	function updateList(person) {
		setCharacters([...characters, person]);
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