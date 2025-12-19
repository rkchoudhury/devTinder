import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ChatMessages } from "../../components/ChatMessages";
import { createSocketConnection } from "../../utils/socket";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";
import type { IChatMessage } from "../../models/chatModel";

interface ChatLocationState {
  targetUserId: string;
  targetUserName: string;
}

export const Chat: React.FC = () => {
  const location = useLocation();
  const { targetUserId: toUserId, targetUserName } =
    (location.state as ChatLocationState) || {};
  const user = useSelector((state: RootState) => state.user as IUser | null);
  const fromUserId = user?._id;

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!fromUserId || !toUserId) return;

    const socket = createSocketConnection();
    // As soon as the page loads, join the chat room
    socket.emit("joinChat", { fromUserId, toUserId });

    socket.on("receiveMessage", ({ fromUserId, toUserId, message }) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { fromUserId, toUserId, message },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { fromUserId, toUserId, message: newMessage });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-0">
      <div className="flex flex-col items-center justify-center border-2 border-gray-600 rounded-lg shadow-md w-full md:w-1/2 mt-10">
        <h1 className="border-b-2 border-gray-600 py-4 mb-4 w-full text-center">
          Chat
        </h1>
        <div
          ref={chatContainerRef}
          className="h-[60vh] w-full px-2 pb-4 overflow-y-auto"
        >
          <ChatMessages
            chatMessages={chatMessages}
            currentUserId={fromUserId ?? ""}
            currentUserName={user?.firstName ?? "You"}
            targetUserName={targetUserName}
          />
        </div>
        <div className="border-t-2 border-gray-600 py-4 px-4 w-full flex justify-end">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary ml-4" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
