import { useState } from "react";
import useFetch from "./useFetch.jsx";
import "./App.css";

export default function App() {

    // store current user input
    const [text, setText] = useState("");

    // use states and function provided by the custom hook (component)
    const [data, setData, error, loading, fetchData] = useFetch();

     function handleChange(e) {

         // current value of controlled input field
         const value = e.target.value;

         // update input state
         setText(value);

         // user cleared input field
         if (value.trim() === "") {
             setData(null);
             return;
         }

         const url =
             `https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=${value}`;

         // trigger fetch request using custom hool
         fetchData(url);
    }

    let output = "";

     // request currently loading
     if(loading) output = "Loading...";

     // error during request
     else if (error) output = "Error...";

     // successfully received response
     else if (data) {

         // extract pages object from JSON response
         const pages = data.query.pages;

         // access first page object
         const page = pages ? Object.values(pages)[0] : null;

         // extract HTML content
         output = page.extract || "Kein Ergebnis für die Suche";
     }

    return (
        <div>
            <input
                className="NiceInput"
                value={text}
                onChange={handleChange}
                placeholder="Wikipedia-Suche..."
            />

        <div className="NiceOutput" dangerouslySetInnerHTML={{ __html: output }}/> {/*build extracted HTML component directly into DOM tree*/}
      </div>
    );
}