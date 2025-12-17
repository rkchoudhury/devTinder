import React from 'react';
import { useLocation } from 'react-router-dom';

interface ChatLocationState {
  userId: string;
}

export const Chat: React.FC = () => {
  const location = useLocation();
  const { userId } = (location.state as ChatLocationState) || {};

  return (
    <div>
      <h1>Chat Screen</h1>
      <h1>userId: {userId}</h1>
    </div>
  );
};
