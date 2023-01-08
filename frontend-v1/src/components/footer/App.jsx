import React from "react";
import "./styles.css";

function App() {
  const Year = new Date().getFullYear();

  return (
    <div>
      <footer>
        <div className="center-footer-on-page">
          <span className="emphasized-paragraph-text">IMSA Replay</span>©{Year}
        </div>
      </footer>
    </div>
  );
}

export default App;
