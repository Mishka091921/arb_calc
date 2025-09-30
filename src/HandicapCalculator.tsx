import React, { useState } from "react";

export default function HandicapCalculator() {
  const [oddA, setOddA] = useState("");
  const [oddB, setOddB] = useState("");
  const [stakeA, setStakeA] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const oA = parseFloat(oddA);
    const oB = parseFloat(oddB);
    const sA = parseFloat(stakeA);

    if (!oA || !oB || !sA) return alert("Enter valid odds and stake");

    const arbValue = 1 / oA + 1 / oB;
    const isArb = arbValue < 1;

    const stakeB = (sA * oA) / oB;
    const returnA = sA * oA;
    const returnB = stakeB * oB;
    const totalReturn = Math.min(returnA, returnB);

    const totalStake = sA + stakeB;
    const profit = totalReturn - totalStake;
    const roi = (profit / totalStake) * 100;

    setResults({ arbValue, isArb, stakeB, totalStake, totalReturn, profit, roi });
  };

  return (
    <div>
      <h2>🎾 Game Handicap Arbitrage</h2>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        <input
          type="number"
          step="0.01"
          placeholder="Odd for Player A (+0.5)"
          value={oddA}
          onChange={(e) => setOddA(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Odd for Player B (-0.5)"
          value={oddB}
          onChange={(e) => setOddB(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stake on Player A"
          value={stakeA}
          onChange={(e) => setStakeA(e.target.value)}
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
          <p>Stake on Player B: ₱{results.stakeB.toFixed(2)}</p>
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
