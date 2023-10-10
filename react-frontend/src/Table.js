import React from "react";

/* These 'functions' are react 'components'. This one specifically is a custom
made HTML table. Components are capitalized to differentiate from typical
HTML elements.*/

// Header component of the Table
function TableHeader() {
  return (
    <thead>  {/* Tag given to make header of a group of a table */}
      <tr>  {/* Tag given to make row in a table */}
        <th>Name</th>  {/* Tag given to make header in cell of a table */}
        <th>Job</th>
		<th>ID</th>
		<th>Remove</th>
      </tr>
    </thead>
  );
}


// Body component of the Table
function TableBody(props) {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.name}</td>
				<td>{row.job}</td>
				<td>{row.id}</td>
				<td> 
					<button onClick={() =>
						props.removeCharacter(index)} > Delete
					</button>
				</td>
			</tr>
		);
	}
	);
	return (
		<tbody>
			{rows}
		</tbody>
	);
}

// Table component
function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData}
	  	removeCharacter={props.removeCharacter} />
    </table>
  );
}

export default Table;