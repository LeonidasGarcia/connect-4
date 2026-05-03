import { motion } from 'framer-motion';
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
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-bold" style={{ fontSize: '64px' }}>
        {titleLetters.map((letter, index) => (
          <span key={index} style={{ color: COLORS[(index % 2) + 1] }}>
            {letter}
          </span>
        ))}
      </h2>
      {/* Fila del Jugador 1. */}
      <div
        className="flex w-full justify-between items-baseline gap-1"
        style={{ lineHeight: '32px' }}
      >
        <span
          className="font-semibold"
          style={{ color: COLORS[PLAYER_1], fontSize: '32px' }}
        >
          {PLAYER_NAMES[PLAYER_1]}
        </span>
        <motion.span
          className="font-bold"
          style={{ color: COLORS[PLAYER_1], fontSize: '32px' }}
          key={scorePlayer1}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          {scorePlayer1}
        </motion.span>
      </div>
      {/* Fila del Jugador 2. */}
      <div
        className="flex w-full justify-between items-baseline gap-1"
        style={{ lineHeight: '32px' }}
      >
        <span
          className="font-semibold"
          style={{ color: COLORS[PLAYER_2], fontSize: '32px' }}
        >
          {PLAYER_NAMES[PLAYER_2]}
        </span>
        <motion.span
          className="font-bold"
          style={{ color: COLORS[PLAYER_2], fontSize: '32px' }}
          key={scorePlayer2}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          {scorePlayer2}
        </motion.span>
      </div>
    </div>
  );
}