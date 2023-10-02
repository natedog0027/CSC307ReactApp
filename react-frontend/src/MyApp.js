import React from "react";
import Table from "./Table";


const characters = [
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
];

function MyApp() {
  return (
    <div classname="container">
      <Table characterData={characters} /> {/*Made a property "characterData"
			where I am passing through the variable "characters". "characters" has
			curly brackets because it is a js expression within an HTML element.*/}
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