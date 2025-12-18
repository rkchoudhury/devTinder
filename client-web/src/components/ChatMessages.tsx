import React from "react";

export const ChatMessages: React.FC<{ messages: any[] }> = ({
  messages,
}) => {
  return (
    <>
      {messages.map((eachMessage) => (
        <div>
          <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble chat-bubble-info">
              You were the Chosen One!
            </div>
          </div>

          <div className="chat chat-end">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble chat-bubble-accent">
              That's never been done in the history of the Jedi.
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
