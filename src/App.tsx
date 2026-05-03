import { useState } from 'react';
import { PLAYER_1 } from './constants/colors';
import { Board } from './components/Board';
import { GameTitle } from './components/GameTitle';
import { Scoreboard } from './components/Scoreboard';
import { GameStatus } from './components/GameStatus';

export default function App() {
  const [currentPlayer] = useState(PLAYER_1);
  const [scorePlayer1] = useState(0);
  const [scorePlayer2] = useState(0);
  // Jugador local (simulado como Player 1).
  const localPlayer = PLAYER_1;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 gap-6"
      style={{ backgroundColor: '#323232' }}
    >
      <GameTitle />
      <Scoreboard scorePlayer1={scorePlayer1} scorePlayer2={scorePlayer2} />
      <GameStatus isCurrentPlayerTurn={currentPlayer} localPlayer={localPlayer} />
      <Board currentPlayer={currentPlayer} />
    </div>
  );
}