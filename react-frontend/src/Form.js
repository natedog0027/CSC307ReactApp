import React, {useState} from "react";

// This is to create a functional form in order to submit characters to the list
function Form(props) {
    // sets the initial state to be an empty list
    const [person, setPerson] = useState(
        {
            name: "",
            job: "",
        }
    );

    //This function runs every time a change is made to an input. For adding characters 
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "job")
            setPerson({name: person["name"], job: value}
            );
        else
            setPerson({name: value, job: person["job"]}
            );
    }

    function submitForm() {
        props.handleSubmit(person);
        setPerson({name: "", job: ""});
    }

    return (
        <form>
            <label htmlFor="name"> Name </label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}/>
            <label htmlFor="job"> Job </label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
};



export default Form;