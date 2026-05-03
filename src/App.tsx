import { Board } from './components/Board';
import { GameTitle } from './components/GameTitle';
import { Scoreboard } from './components/Scoreboard';
import { GameStatus } from './components/GameStatus';
import { useGameStore } from './store/gameStore';

export default function App() {
  const currentPlayerId = useGameStore((state) => state.currentPlayerId);
  const scores = useGameStore((state) => state.scores);
  const players = useGameStore((state) => state.players);
  const localPlayerId = useGameStore((state) => state.localPlayerId);

  const player1Score = players[0] ? scores[players[0].id] || 0 : 0;
  const player2Score = players[1] ? scores[players[1].id] || 0 : 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-jersey"
      style={{ backgroundColor: '#323232' }}
    >
      <div className="flex flex-col items-center gap-6">
        <GameTitle />

        <div className="flex flex-row items-stretch gap-8 md:gap-24">
          <Board />

          <div className="flex flex-col flex-1">
            <Scoreboard
              scorePlayer1={player1Score}
              scorePlayer2={player2Score}
              players={players}
            />
            <div className="flex flex-1 justify-center items-center">
              <GameStatus
                currentPlayerId={currentPlayerId}
                localPlayerId={localPlayerId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}