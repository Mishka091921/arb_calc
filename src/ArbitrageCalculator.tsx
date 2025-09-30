import { useState } from "react";

interface CalculationResults {
  arbValue: number;
  isArb: boolean;
  stakeB: number;
  totalStake: number;
  totalReturn: number;
  profit: number;
  roi: number;
}

export default function ArbitrageCalculator() {
  const [oddA, setOddA] = useState("");
  const [oddB, setOddB] = useState("");
  const [stakeA, setStakeA] = useState("");
  const [results, setResults] = useState<CalculationResults | null>(null);

  const calculateArbitrage = () => {
    const oA = parseFloat(oddA);
    const oB = parseFloat(oddB);
    const sA = parseFloat(stakeA);

    if (!oA || !oB || !sA) {
      alert("Please enter valid numbers for odds and stake.");
      return;
    }

    const arbValue = 1 / oA + 1 / oB;
    const isArb = arbValue < 1;

    const stakeB = (sA * oA) / oB;

    const returnA = sA * oA;
    const returnB = stakeB * oB;
    const totalReturn = Math.min(returnA, returnB);

    const totalStake = sA + stakeB;
    const profit = totalReturn - totalStake;
    const roi = (profit / totalStake) * 100;

    setResults({
      arbValue,
      isArb,
      stakeB,
      totalStake,
      totalReturn,
      profit,
      roi,
    });
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>🎯 Arbitrage Calculator</h2>

      <div style={{ display: "grid", gap: "1rem" }}>
        <input
          type="number"
          step="0.01"
          placeholder="Odd (Site A)"
          value={oddA}
          onChange={(e) => setOddA(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Odd (Site B)"
          value={oddB}
          onChange={(e) => setOddB(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Stake on Site A"
          value={stakeA}
          onChange={(e) => setStakeA(e.target.value)}
        />
        <button
          onClick={calculateArbitrage}
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
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#f9fafb",
          }}
        >
          <h3>📊 Results</h3>
          <p>
            Arbitrage Value: {results.arbValue.toFixed(4)}{" "}
            {results.isArb ? "✅ (Arbitrage!)" : "❌ (No arb)"}
          </p>
          <p>Stake on Site B: <b>₱{results.stakeB.toFixed(2)}</b></p>
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
