const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("ユーザーが接続しました");

	// メッセージを受信、送信
	socket.on("sendMessage", (message) => {
		console.log("受信メッセージ：", message);
		io.emit("receiveMessage", message);
	});

	socket.on("disconnect", () => {
		console.log("ユーザーが切断しました");
	});
});

server.listen(5000, () => {
	console.log("サーバーがポート5000で起動しました");
});