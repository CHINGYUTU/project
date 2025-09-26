import ChatPanel from "./components/ChatPanel";
import PointsAndRewards from "./components/PointsAndRewards";

export default function App() {
  const apiBase = "http://localhost:3000";
  const token = "dev";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <ChatPanel
          apiBase={apiBase}
          authToken={token}
          myUserId={2}       // 你的假登入 id
          otherUserId={1}
          itemId={3}
        />
        <PointsAndRewards apiBase={apiBase} authToken={token} />
      </div>
    </div>
  );
}
