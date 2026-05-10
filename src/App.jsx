import { useState } from "react";
import useFetch from "./useFetch.jsx";
import "./App.css";

export default function App() {
    const [text, setText] = useState("");
    const [data, setData, error, loading, fetchData] = useFetch();

     function handleChange(e) {
        const value = e.target.value;
        setText(value);

        // no input by user yet/ user clears input
        if (value.trim() === "") {
            setData(null);
            return;
        }

        const url =
            `https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=${value}`;

        // call hook and pass required url
        fetchData(url);
    }

    let output = "";

     if(loading) output = "Loading...";
     else if (error) output = "Error...";
     else if (data) {
         const pages = data.query.pages;
         const page = pages ? Object.values(pages)[0] : null;
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

        <div className="NiceOutput" dangerouslySetInnerHTML={{ __html: output }}/>
      </div>
    );
}