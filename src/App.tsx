import React, { useState } from "react";
import HandicapCalculator from "./HandicapCalculator";
import OverUnderCalculator from "./OverUnderCalculator";
import ArbitrageFinder from "./ArbitrageFinder";

function App() {
  const [section, setSection] = useState("handicap");

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center", // center vertically
        alignItems: "center", // center horizontally
        background: "#f9fafb",
        padding: "1rem",
      }}
    >
      {/* Centered Box */}
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "2rem" }}>⚡ Arbitrage Calculator</h1>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setSection("handicap")}
            style={{
              padding: "0.75rem 1.5rem",
              background: section === "handicap" ? "#2563eb" : "#e5e7eb",
              color: section === "handicap" ? "#fff" : "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              minWidth: "140px",
            }}
          >
            🎾 Game Handicap
          </button>
          <button
            onClick={() => setSection("overunder")}
            style={{
              padding: "0.75rem 1.5rem",
              background: section === "overunder" ? "#2563eb" : "#e5e7eb",
              color: section === "overunder" ? "#fff" : "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              minWidth: "140px",
            }}
          >
            📊 Over/Under
          </button>
          <button
            onClick={() => setSection("finder")}
            style={{
              padding: "0.75rem 1.5rem",
              background: section === "finder" ? "#2563eb" : "#e5e7eb",
              color: section === "finder" ? "#fff" : "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              minWidth: "140px",
            }}
          >
            🔍 Finder
          </button>
        </div>

        {/* Section Render */}
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          {section === "handicap" && <HandicapCalculator />}
          {section === "overunder" && <OverUnderCalculator />}
          {section === "finder" && <ArbitrageFinder />}
        </div>
      </div>
    </div>
  );
}

export default App;
