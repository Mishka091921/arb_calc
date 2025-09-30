import React, { useState } from "react";

export default function OverUnderCalculator() {
  const [oddOver, setOddOver] = useState("");
  const [oddUnder, setOddUnder] = useState("");
  const [stakeOver, setStakeOver] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const oOver = parseFloat(oddOver);
    const oUnder = parseFloat(oddUnder);
    const sOver = parseFloat(stakeOver);

    if (!oOver || !oUnder || !sOver) return alert("Enter valid odds and stake");

    const arbValue = 1 / oOver + 1 / oUnder;
    const isArb = arbValue < 1;

    const stakeUnder = (sOver * oOver) / oUnder;
    const returnOver = sOver * oOver;
    const returnUnder = stakeUnder * oUnder;
    const totalReturn = Math.min(returnOver, returnUnder);

    const totalStake = sOver + stakeUnder;
    const profit = totalReturn - totalStake;
    const roi = (profit / totalStake) * 100;

    setResults({ arbValue, isArb, stakeUnder, totalStake, totalReturn, profit, roi });
  };

  return (
    <div>
      <h2>📊 Over/Under Arbitrage</h2>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        <input
          type="number"
          step="0.01"
          placeholder="Odd for Over"
          value={oddOver}
          onChange={(e) => setOddOver(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Odd for Under"
          value={oddUnder}
          onChange={(e) => setOddUnder(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stake on Over"
          value={stakeOver}
          onChange={(e) => setStakeOver(e.target.value)}
        />
        <button
          onClick={calculate}
          style={{
            padding: "0.75rem",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>
      </div>

      {results && (
        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f9fafb", borderRadius: "12px" }}>
          <h3>📊 Results</h3>
          <p>Arb Value: {results.arbValue.toFixed(4)} {results.isArb ? "✅ Arbitrage!" : "❌ No arb"}</p>
          <p>Stake on Under: ₱{results.stakeUnder.toFixed(2)}</p>
          <p>Total Stake: ₱{results.totalStake.toFixed(2)}</p>
          <p>Guaranteed Return: ₱{results.totalReturn.toFixed(2)}</p>
          <p style={{ color: results.profit > 0 ? "green" : "red" }}>
            Profit: ₱{results.profit.toFixed(2)} ({results.roi.toFixed(2)}%)
          </p>
        </div>
      )}
    </div>
  );
}
