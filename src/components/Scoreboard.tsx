import { motion } from 'framer-motion';
import { PLAYER_1, PLAYER_2, COLORS, PLAYER_NAMES } from '../constants/colors';

/* Props del componente Scoreboard. */
interface ScoreboardProps {
  scorePlayer1: number;
  scorePlayer2: number;
}

const SCOREBOARD_TITLE = 'Puntuaciones';

export function Scoreboard({ scorePlayer1, scorePlayer2 }: ScoreboardProps) {
  const titleLetters = SCOREBOARD_TITLE.split('');

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.h2
        className="font-bold"
        style={{ fontSize: '64px' }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {titleLetters.map((letter, index) => (
          <motion.span
            key={index}
            style={{ color: COLORS[(index % 2) + 1], display: 'inline-block' }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h2>
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
        <motion.div
          className="font-bold"
          style={{ color: COLORS[PLAYER_1], fontSize: '32px' }}
          key={scorePlayer1}
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        >
          {scorePlayer1}
        </motion.div>
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
        <motion.div
          className="font-bold"
          style={{ color: COLORS[PLAYER_2], fontSize: '32px' }}
          key={scorePlayer2}
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        >
          {scorePlayer2}
        </motion.div>
      </div>
    </div>
  );
}