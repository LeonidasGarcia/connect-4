import { motion } from 'framer-motion';
import { PLAYER_1, PLAYER_2, COLORS, PLAYER_NAMES } from '../constants/colors';

interface ScoreboardProps {
  scorePlayer1: number;
  scorePlayer2: number;
}

const SCOREBOARD_TITLE = 'Puntuaciones';

function AnimatedPlayerName({
  name,
  playerColor,
  score,
}: {
  name: string;
  playerColor: string;
  score: number;
}) {
  return (
    <motion.span
      className="font-semibold"
      style={{ fontSize: '32px', color: playerColor }}
      animate={{
        scale: score > 0 ? [1, 1.3, 1] : 1,
        y: score > 0 ? [0, -5, 0] : 0,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {name}
    </motion.span>
  );
}

function AnimatedScore({
  playerColor,
  score,
}: {
  playerColor: string;
  score: number;
}) {
  return (
    <motion.div
      className="font-bold"
      style={{ fontSize: '32px', color: playerColor }}
      key={score}
      initial={{ scale: 0, rotate: -20 }}
      animate={{
        scale: [1.3, 1],
        rotate: [20, 0],
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {score}
    </motion.div>
  );
}

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
        <AnimatedPlayerName
          name={PLAYER_NAMES[PLAYER_1]}
          playerColor={COLORS[PLAYER_1]}
          score={scorePlayer1}
        />
        <AnimatedScore playerColor={COLORS[PLAYER_1]} score={scorePlayer1} />
      </div>
      {/* Fila del Jugador 2. */}
      <div
        className="flex w-full justify-between items-baseline gap-1"
        style={{ lineHeight: '32px' }}
      >
        <AnimatedPlayerName
          name={PLAYER_NAMES[PLAYER_2]}
          playerColor={COLORS[PLAYER_2]}
          score={scorePlayer2}
        />
        <AnimatedScore playerColor={COLORS[PLAYER_2]} score={scorePlayer2} />
      </div>
    </div>
  );
}