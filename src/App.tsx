import { useState } from 'react';
import { PLAYER_2 } from './constants/colors';
import { Board } from './components/Board';

export default function App() {
  const [currentPlayer] = useState(PLAYER_2);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: '#1a1a2e' }}
    >
      <Board currentPlayer={currentPlayer} />
    </div>
  );
}
