import React, { memo } from "react";
import type { IChatMessage } from "../models/chatModel";

const ChatMessagesComponent: React.FC<{
  chatMessages: IChatMessage[];
  currentUserName: string;
  targetUserName: string;
  currentUserId: string;
}> = ({ chatMessages, currentUserName, targetUserName, currentUserId }) => {
  return (
    <>
      {chatMessages.map((eachMessage) => {
        const { fromUserId, message, _id, timestamp } = eachMessage;
        const isCurrentUser = fromUserId === currentUserId;
        return (
          <div key={_id}>
            <div
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">
                {isCurrentUser ? currentUserName : targetUserName}
                <time className="text-xs opacity-50">
                  {new Date(timestamp).toLocaleString()}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  isCurrentUser ? "chat-bubble-accent" : "chat-bubble-info"
                }`}
              >
                {message}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const ChatMessages = memo(ChatMessagesComponent);
