import { useState } from "react";
import "./app.css";

export default function App() {
  const [text, setText] = useState("");

  return (
      <div>
        <input
            className="NiceInput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Wikipedia-Suche..."
        />

        <div className="NiceOutput">
          {text}
        </div>
      </div>
  );
}