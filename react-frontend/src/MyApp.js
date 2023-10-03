import React, { useState } from "react";
import Table from "./Table";



function MyApp() {
	// This sets the starting state values as these 4 characters
	const [characters, setCharacters] = useState([
		{
			name: "Charlie",
			job: "Janitor",
		},
		{
			name: "Mac",
			job: "Bouncer",
		},
		{
			name: "Dee",
			job: "Aspiring Actress",
		},
		{
			name: "Dennis",
			job: "Bartender",
		},
	]);

	function removeOneCharacter (index) {
		const updated = characters.filter((character, i) => {
			return i !== index
		});
		setCharacters(updated); 
	}

  return (
    <div classname="container">
        <Table characterData={characters}
	  		removeCharacter={removeOneCharacter} /> {
			/*Made a property (prop) "characterData" where I am passing through the variable "characters".
			"characters" has curly brackets because it is a js expression within an HTML element.*/}
    </div>

    /* Cannot make a second div because in each component you can only have one
    root element. Must make a new function for a new root element.
    <div>
    </div>
  */
  );
}

// Allows this component to be imported into other files or components
export default MyApp; 