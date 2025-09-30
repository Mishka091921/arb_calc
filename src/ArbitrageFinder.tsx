import React, { useState } from "react";

export default function ArbitrageFinder() {
  const [rawData, setRawData] = useState("");
  const [results, setResults] = useState([]);

  const findArbitrage = () => {
    const lines = rawData.split("\n").map(line => line.trim()).filter(line => line !== "");
    const parsedResults = [];

    lines.forEach((line, index) => {
      const parts = line.split(/\s+/); // split by space or tab
      if (parts.length !== 2) return; // skip invalid line

      const oddA = parseFloat(parts[0]);
      const oddB = parseFloat(parts[1]);

      if (!oddA || !oddB) return;

      const arbValue = 1 / oddA + 1 / oddB;
      const isArb = arbValue < 1;

      parsedResults.push({
        id: index + 1,
        oddA,
        oddB,
        arbValue,
        isArb
      });
    });

    setResults(parsedResults);
  };

  return (
    <div>
      <h2>🔍 Arbitrage Finder (Bulk)</h2>
      <p>Paste odds pairs below (one pair per line, e.g. "2.10 1.95"):</p>

      <textarea
        rows={6}
        style={{ width: "100%", padding: "1rem", borderRadius: "8px" }}
        placeholder="Example:\n2.10 1.95\n1.80 2.20\n1.50 2.80"
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
      />

      <button
        onClick={findArbitrage}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Find Arbitrage
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>📊 Results</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e5e7eb" }}>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>#</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Odd A</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Odd B</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Arb Value</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Arbitrage?</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{r.id}</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{r.oddA}</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{r.oddB}</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{r.arbValue.toFixed(4)}</td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      color: r.isArb ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {r.isArb ? "✅ Yes" : "❌ No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
