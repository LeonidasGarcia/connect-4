import { PLAYER_1 } from './constants/colors';
import { Board } from './components/Board';
import { GameTitle } from './components/GameTitle';
import { Scoreboard } from './components/Scoreboard';
import { GameStatus } from './components/GameStatus';
import { useGameStore } from './store/gameStore';

export default function App() {
  // Obtiene el jugador actual desde la store.
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  // Obtiene las puntuaciones desde la store.
  const player1Score = useGameStore((state) => state.player1Score);
  const player2Score = useGameStore((state) => state.player2Score);
  // Jugador local (simulado como Player 1).
  const localPlayer = PLAYER_1;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-jersey"
      style={{ backgroundColor: '#323232' }}
    >
      {/* Contenedor principal con flex-col para organizar todo el contenido. */}
      <div className="flex flex-col items-center gap-6">
        {/* Titulo del juego en la parte superior. */}
        <GameTitle />

        {/* Contenedor inferior con Board a la izquierda y componentes a la derecha. */}
        <div className="flex flex-row items-stretch gap-8 md:gap-24">
          {/* Board a la izquierda. */}
          <Board currentPlayer={currentPlayer} />

          {/* Contenedor derecho: Scoreboard y GameStatus. */}
          <div className="flex flex-col flex-1">
            <Scoreboard
              scorePlayer1={player1Score}
              scorePlayer2={player2Score}
            />
            <div className="flex flex-1 justify-center items-center">
              <GameStatus
                isCurrentPlayerTurn={currentPlayer}
                localPlayer={localPlayer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}