import React from 'react';
import { useLocation } from 'react-router-dom';

interface ChatLocationState {
  userId: string;
}

export const Chat: React.FC = () => {
  const location = useLocation();
  const { userId } = (location.state as ChatLocationState) || {};

  return (
    <div className='flex flex-col items-center justify-center px-4 md:px-0'>
      <div className='flex flex-col items-center justify-center border-2 rounded-lg shadow-md w-full md:w-1/2 mt-10'>
        <h1 className='border-b-2 py-4 mb-4 w-full text-center'>Chat</h1>
        <div className='h-[60vh] w-full px-2'>
          <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble chat-bubble-info">You were the Chosen One!</div>
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
        <div className='border-t-2 py-4 px-4 w-full flex justify-end'>
          <input type="text" placeholder="Type a message..." className="input input-md" />
          <button className="btn btn-primary ml-4">Send</button>
        </div>
      </div>
    </div>
  );
};
