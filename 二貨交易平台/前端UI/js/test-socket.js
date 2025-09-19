// 需要安裝 socket.io-client: npm i socket.io-client
const io = require("socket.io-client");
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  // 如果 server 有 auth token，可以送 query or auth
  auth: { token: "Bearer <你的token>" } // 你的 server 可能不是這樣驗證，按實作調整
});

socket.on("connect", () => {
  console.log("connected", socket.id);

  // 加入房間（模擬 client 登入時）
  const myUserId = 10;
  socket.emit("join", myUserId);

  // 發送訊息（假設先用 REST 上傳圖片拿到 image_url）
  const msg = {
    sender_id: myUserId,
    receiver_id: 123,
    item_id: 45,
    order_id: null,
    content: "Socket 試發訊息",
    image_url: "/uploads/messages/169xxx.jpg"
  };

  socket.emit("sendMessage", msg);
});

socket.on("receiveMessage", (data) => {
  console.log("收到訊息:", data);
});

socket.on("errorMessage", (err) => {
  console.error("錯誤:", err);
});
