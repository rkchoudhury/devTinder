import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ChatMessages } from "../../components/ChatMessages";
import { createSocketConnection } from "../../utils/socket";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";
import type { IChatMessage } from "../../models/chatModel";
import { getChat } from "../../services/chatService";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { showAlert } from "../../redux/slices/alertSlice";

interface ChatLocationState {
  targetUserId: string;
  targetUserName: string;
}

export const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { targetUserId: toUserId, targetUserName } =
    (location.state as ChatLocationState) || {};
  const user = useSelector((state: RootState) => state.user as IUser | null);
  const fromUserId = user?._id;

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Approach 1: Using REST API to fetch chat history
     * Fetch chat history when component mounts
     */
    async function fetchChatHistory() {
      if (!fromUserId || !toUserId) return;

      try {
        dispatch(showLoader({ message: "Loading chat..." }));
        const chatData = await getChat(toUserId);
        setChatMessages(chatData.messages);
      } catch {
        dispatch(
          showAlert({
            showAlert: true,
            message: "Failed to fetch chat history",
            duration: 5000,
          })
        );
      } finally {
        dispatch(hideLoader());
      }
    }

    // fetchChatHistory();
  }, []);

  useEffect(() => {
    if (!fromUserId || !toUserId) return;

    const socket = createSocketConnection();
    // As soon as the page loads, join the chat room
    socket.emit("joinChat", { fromUserId, toUserId });

    /**
     * Approach 2: Using Socket.IO to fetch chat history
     * Fetch chat history when component mounts
     */
    dispatch(showLoader({ message: "Loading chat..." }));
    socket.emit("chatHistory", { fromUserId, toUserId });
    socket.on("chatHistoryResponse", ({ messages }) => {
      setChatMessages(messages);
      dispatch(hideLoader());
    });

    socket.on("receiveMessage", ({ senderId, message, timestamp, _id}) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId,
          message,
          timestamp,
          _id,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button className="btn btn-primary ml-4" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
