import React, { useEffect, useState } from "react";

export default function PointsAndRewards({ apiBase, authToken }) {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" };

  const loadAll = async () => {
    const b = await fetch(`${apiBase}/api/points/balance`, { headers }).then(r => r.json());
    const r = await fetch(`${apiBase}/api/points/rewards`, { headers }).then(r => r.json());
    setPoints(b.points ?? 0);
    setRewards(r.rewards ?? []);
  };

  useEffect(() => { loadAll(); }, []);

  const earnTrade = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/points/earn-trade`, { method: "POST", headers, body: JSON.stringify({}) }).then(r => r.json());
      setPoints(res.points);
    } finally { setLoading(false); }
  };

  const redeem = async (reward_id) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/points/redeem`, { method: "POST", headers, body: JSON.stringify({ reward_id }) }).then(r => r.json());
      if (res.points !== undefined) setPoints(res.points);
      await loadAll();
      alert(res.message || "已兌換");
    } catch (e) {
      console.error(e);
      alert("兌換失敗");
    } finally { setLoading(false); }
  };

  return (
    <div className="rounded-2xl shadow p-4 bg-white space-y-3">
      <div className="text-xl font-semibold">積分與兌換</div>

      <div className="flex items-center gap-3">
        <div>目前點數：</div>
        <span className="px-3 py-1 rounded-full bg-gray-100">{points}</span>
        <button onClick={earnTrade} disabled={loading} className="px-3 py-1 rounded-lg bg-black text-white">
          完成交易（+10 點）
        </button>
      </div>

      <div className="space-y-2">
        {rewards.map(r => (
          <div key={r.id} className="flex items-center justify-between border rounded-xl p-3">
            <div>
              <div className="font-medium">{r.name} <span className="text-sm text-gray-500">（需要 {r.cost} 點）</span></div>
              <div className="text-sm text-gray-500">{r.description}</div>
            </div>
            <button disabled={loading || points < r.cost} onClick={() => redeem(r.id)}
              className="px-3 py-1 rounded-lg border">
              兌換
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
