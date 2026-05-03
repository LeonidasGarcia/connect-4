import { Token } from './Token';
import type { Player } from '../store/gameStore';

const BOARD_COLORS = ['#C2593C', '#DBB057'];

interface CellProps {
  row: number;
  col: number;
  playerId: string | null;
  playerIndex: number;
  currentPlayerIndex: number;
  players: Player[];
  onClick: (row: number, col: number) => void;
}

export function Cell({
  row,
  col,
  playerId,
  playerIndex,
  currentPlayerIndex,
  players,
  onClick,
}: CellProps) {
  const isEmpty = playerId === null;
  const currentColor = BOARD_COLORS[currentPlayerIndex];
  const player = players[playerIndex];
  const playerColor = player?.color || '#D54117';

  return (
    <button
      className="w-10 h-10 sm:w-16 sm:h-16 p-0.5 sm:p-1 rounded-full transition-colors duration-300"
      style={{
        backgroundColor: isEmpty ? currentColor : 'transparent',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}
      onClick={() => onClick(row, col)}
      type="button"
    >
      {isEmpty ? (
        <div className="w-full h-full rounded-full sm:shadow-[inset_0_16px_4px_rgba(0,0,0,0.4)] shadow-[inset_0_8px_4px_rgba(0,0,0,0.4)]" />
      ) : (
        <Token playerIndex={playerIndex} color={playerColor} />
      )}
    </button>
  );
}