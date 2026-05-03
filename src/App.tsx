import { useState } from 'react';
import { PLAYER_1 } from './constants/colors';
import { Board } from './components/Board';
import { GameTitle } from './components/GameTitle';

export default function App() {
  const [currentPlayer] = useState(PLAYER_1);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: '#323232' }}
    >
      <GameTitle />
      <Board currentPlayer={currentPlayer} />
    </div>
  );
}