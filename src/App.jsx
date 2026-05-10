import { useState } from "react";
import "./App.css";

export default function App() {
    const [text, setText] = useState("");
    const [output, setOutput] = useState("");

    async function fetchWiki(url) {
        try{
            const response = await fetch(url);
            const data = await response.json();

            const pages = data.query.pages;
            if (!pages) {
                setOutput("Kein Ergebnis");
                return;
            }
            const page = Object.values(pages)[0];
            const extractText = page.extract ? page.extract : "Kein Ergebnis zur Suche";
            setOutput(extractText);
        }
        catch(err){
            setOutput("Fehler bei der Anfrage: " + err);
        }
    }

    async function handleChange(e) {
        const value = e.target.value;
        setText(value);

        // no input by user yet/ user clears input
        if (value.trim() === "") {
            setOutput("");
            return;
        }

        const url =
            `https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=${value}`;
        await fetchWiki(url);
    }

  return (
      <div>
        <input
            className="NiceInput"
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Wikipedia-Suche..."
        />

        <div className="NiceOutput" dangerouslySetInnerHTML={{ __html: output }}/>
      </div>
  );
}