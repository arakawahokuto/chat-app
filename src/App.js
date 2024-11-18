import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./reset.css";
import "./App.css";

// サーバーとの接続を確率
const socket = io("http://localhost:5000");

const App = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	// サーバーからのメッセージを受信
	useEffect(() => {
		socket.on("receiveMessage", (newMessage) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => {
			socket.off("receiveMessage"); // クリーンアップ
		};
	}, []);

	// メッセージを送信
	const sendMessage = () => {
		if (message.trim()) {
			socket.emit("sendMessage", message); // サーバーに送信
			setMessage(""); // 入力フィールドをクリア
		}
	};

	return (
		<div className="p-chat">
			<h1 className="c-heading-01">チャットアプリ</h1>
			<div className="p-chat__item">
				<div className="p-chat__item-body">
					{messages.map((msg, index) => (
						<p key={index} className="p-chat__text">{msg}</p>
					))}
				</div>
				<div className="p-chat__item-submit">
					<input type="text" value={message} className="p-chat__input" placeholder="メッセージを入力" onChange={(e) => setMessage(e.target.value)} />
					<button onClick={sendMessage} className="c-button-01">送信</button>
				</div>
			</div>
		</div>
	)
}

export default App;
