import { motion } from 'framer-motion';
import { COLORS } from '../constants/colors';

interface GameStatusProps {
  isCurrentPlayerTurn: number;
  localPlayer: number;
}

const TURN_MESSAGE = '¡Tu Turno!';
const WAIT_MESSAGE = 'Espera';

function LoadingDots({ color }: { color: number }) {
  return (
    <span style={{ color: COLORS[color] }}>
      {[1, 2, 3].map((n) => (
        <motion.span
          key={n}
          style={{ display: 'inline-block' }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (n - 1) * 0.5,
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

export function GameStatus({
  isCurrentPlayerTurn,
  localPlayer,
}: GameStatusProps) {
  const isMyTurn = isCurrentPlayerTurn === localPlayer;
  const message = isMyTurn ? TURN_MESSAGE : WAIT_MESSAGE;
  const letters = message.split('').map((l) => (l === ' ' ? '\u00A0' : l));
  const colorIndex = isMyTurn ? localPlayer : localPlayer === 1 ? 2 : 1;

  return (
    <div className="flex flex-col items-center">
      <motion.p
        className="font-bold"
        style={{ fontSize: '64px' }}
        key={message}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {letters.map((letter, index) => {
          const showJump = !isMyTurn;

          return (
            <motion.span
              key={index}
              style={{ color: COLORS[colorIndex], display: 'inline-block' }}
              initial={{ y: 10, opacity: 1 }}
              animate={showJump ? 'jump' : 'visible'}
              variants={{
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: index * 0.04,
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  },
                },
                jump: {
                  y: [0, -10, 0],
                  opacity: 1,
                  transition: {
                    delay: showJump ? Math.random() * 10 : 0,
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 1.7,
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          );
        })}
        {!isMyTurn && <LoadingDots color={colorIndex} />}
      </motion.p>
    </div>
  );
}
