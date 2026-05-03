import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Column } from './Column';

interface BoardProps {}

const COLS = 7;

const BOARD_COLORS = ['#C2593C', '#DBB057'];

export function Board({}: BoardProps) {
  const board = useGameStore((state) => state.board);
  const currentPlayerId = useGameStore((state) => state.currentPlayerId);
  const players = useGameStore((state) => state.players);
  const makeMove = useGameStore((state) => state.makeMove);

  const currentPlayerIndex = players.findIndex(p => p.id === currentPlayerId);
  const currentColor = BOARD_COLORS[currentPlayerIndex];

  return (
    <motion.div
      className="p-1 rounded-2xl sm:rounded-3xl"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        backgroundColor: currentColor,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      style={{
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}
    >
      <motion.div
        className="p-4 rounded-2xl sm:rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundColor: currentColor,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        style={{
          boxShadow:
            'inset 4px 4px 4px rgba(0, 0, 0, 0.4), inset -4px -4px 4px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex gap-4">
          {Array.from({ length: COLS }).map((_, col) => (
            <Column
              key={col}
              col={col}
              board={board}
              players={players}
              currentPlayerId={currentPlayerId}
              onColumnClick={makeMove}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}