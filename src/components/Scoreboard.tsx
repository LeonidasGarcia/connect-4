import { PLAYER_1, PLAYER_2, COLORS, PLAYER_NAMES } from '../constants/colors';

/* Props del componente Scoreboard. */
interface ScoreboardProps {
  // Puntuación del Jugador 1.
  scorePlayer1: number;
  // Puntuación del Jugador 2.
  scorePlayer2: number;
}

/* Titulo de puntuaciones con colores intercalados. */
const SCOREBOARD_TITLE = 'Puntuaciones';

/* Componente que muestra la tabla de puntuaciones. */
export function Scoreboard({ scorePlayer1, scorePlayer2 }: ScoreboardProps) {
  const titleLetters = SCOREBOARD_TITLE.split('');

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        {titleLetters.map((letter, index) => (
          <span key={index} style={{ color: COLORS[(index % 2) + 1] }}>
            {letter}
          </span>
        ))}
      </h2>
      <div className="flex gap-8">
        {/* Fila del Jugador 1. */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-lg sm:text-xl font-semibold"
            style={{ color: COLORS[PLAYER_1] }}
          >
            {PLAYER_NAMES[PLAYER_1]}
          </span>
          <span
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: COLORS[PLAYER_1] }}
          >
            {scorePlayer1}
          </span>
        </div>
        {/* Fila del Jugador 2. */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-lg sm:text-xl font-semibold"
            style={{ color: COLORS[PLAYER_2] }}
          >
            {PLAYER_NAMES[PLAYER_2]}
          </span>
          <span
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: COLORS[PLAYER_2] }}
          >
            {scorePlayer2}
          </span>
        </div>
      </div>
    </div>
  );
}
