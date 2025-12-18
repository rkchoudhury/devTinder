import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ChatMessages } from "../../components/ChatMessages";

interface ChatLocationState {
  userId: string;
}

export const Chat: React.FC = () => {
  const location = useLocation();
  const { userId } = (location.state as ChatLocationState) || {};

  const [message, setMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-0">
      <div className="flex flex-col items-center justify-center border-2 rounded-lg shadow-md w-full md:w-1/2 mt-10">
        <h1 className="border-b-2 py-4 mb-4 w-full text-center">Chat</h1>
        <div
          ref={chatContainerRef}
          className="h-[60vh] w-full px-2 pb-4 overflow-y-auto"
        >
          <ChatMessages messages={["1"]} />
        </div>
        <div className="border-t-2 py-4 px-4 w-full flex justify-end">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary ml-4">Send</button>
        </div>
      </div>
    </div>
  );
};
