import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function ChatPanel({ apiBase, authToken, myUserId, otherUserId, itemId = null }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);
  const typingTimer = useRef(null);

  const headers = useMemo(() => ({ Authorization: `Bearer ${authToken}` }), [authToken]);
  const socket = useMemo(() => io(apiBase, { transports: ["websocket"], withCredentials: false }), [apiBase]);

  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages]);

  const loadHistory = async () => {
    const url = new URL(`/api/message`, apiBase);
    url.searchParams.set("otherUserId", String(otherUserId));
    if (itemId !== null && itemId !== undefined) url.searchParams.set("item_id", String(itemId));
    const res = await fetch(url.toString(), { headers });
    const data = await res.json();
    const arr = Array.isArray(data) ? data : (data.messages || []);
    setMessages(arr);
  };

  useEffect(() => {
    loadHistory();
    socket.emit("join", myUserId);

    const onReceive = (msg) => {
      const matchPair =
        (msg.sender_id === myUserId && msg.receiver_id === otherUserId) ||
        (msg.sender_id === otherUserId && msg.receiver_id === myUserId);
      if (matchPair && (itemId == null || msg.item_id === itemId)) setMessages((p) => [...p, msg]);
    };
    socket.on("receiveMessage", onReceive);

    const onTyping = (p) => { if (p?.from === otherUserId) setIsTyping(true); };
    const onStopTyping = (p) => { if (p?.from === otherUserId) setIsTyping(false); };
    socket.on("typing", onTyping);
    socket.on("stopTyping", onStopTyping);

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.off("typing", onTyping);
      socket.off("stopTyping", onStopTyping);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase, myUserId, otherUserId, itemId]);

  const notifyTyping = () => {
    socket.emit("typing", { to: otherUserId, from: myUserId });
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => socket.emit("stopTyping", { to: otherUserId, from: myUserId }), 1200);
  };

  const sendText = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${apiBase}/api/message/send`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ receiver_id: otherUserId, item_id: itemId, order_id: null, content: text }),
      });
      const data = await res.json();
      if (data?.data) setMessages((p) => [...p, data.data]);
      setText("");
    } finally { setSending(false); }
  };

  const sendImage = async () => {
    if (!file) return;
    setSending(true);
    try {
      const form = new FormData();
      form.append("receiver_id", String(otherUserId));
      if (itemId != null) form.append("item_id", String(itemId));
      form.append("image", file);
      const res = await fetch(`${apiBase}/api/message/send`, { method: "POST", headers, body: form });
      const data = await res.json();
      if (data?.data) setMessages((p) => [...p, data.data]);
      setFile(null);
    } finally { setSending(false); }
  };

  return (
    <div className="w-full h-full max-h-[650px] grid grid-rows-[auto,1fr,auto] rounded-2xl shadow p-4 bg-white">
      <div className="flex items-center justify-between pb-2 border-b">
        <div className="font-semibold">Chat with #{otherUserId}{itemId != null ? ` — item #${itemId}` : ""}</div>
        {isTyping && <div className="text-sm italic opacity-70">對方正在輸入…</div>}
      </div>

      <div ref={listRef} className="overflow-y-auto space-y-2 py-3">
        {messages.map((m) => {
          const mine = m.sender_id === myUserId;
          return (
            <div key={m.id || `${m.sender_id}-${m.created_at}-${Math.random()}`} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 shadow ${mine ? "bg-blue-100" : "bg-gray-100"}`}>
                {m.image_url ? (
                  <a href={`${apiBase}${m.image_url}`} target="_blank" rel="noreferrer" className="block">
                    <img src={`${apiBase}${m.image_url}`} alt="img" className="rounded-md max-h-64" />
                  </a>
                ) : (
                  <span className="whitespace-pre-wrap break-words">{m.content}</span>
                )}
                <div className="text-[10px] opacity-60 mt-1 text-right">
                  {new Date(m.created_at || Date.now()).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="h-full w-full flex items-center justify-center text-gray-400">尚無訊息，開始聊天吧！</div>
        )}
      </div>

      <div className="pt-2 border-t flex gap-2 items-end">
        <input
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
          placeholder="輸入訊息…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(); } }}
          onInput={notifyTyping}
        />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button
          disabled={sending || (!text.trim() && !file)}
          onClick={() => (file ? sendImage() : sendText())}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
        >
          送出
        </button>
      </div>
    </div>
  );
}
