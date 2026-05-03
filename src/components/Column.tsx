import type { Board, Player } from '../store/gameStore';
import { Cell } from './Cell';

interface ColumnProps {
  col: number;
  board: Board;
  players: Player[];
  currentPlayerId: string;
  onColumnClick: (col: number) => void;
}

const ROWS = 6;

export function Column({
  col,
  board,
  players,
  currentPlayerId,
  onColumnClick,
}: ColumnProps) {
  const currentPlayerIndex = players.findIndex(p => p.id === currentPlayerId);

  return (
    <button
      className="flex flex-col gap-4 hover:bg-white/15 rounded-lg p-1 transition-colors duration-200"
      onClick={() => onColumnClick(col)}
      type="button"
    >
      {Array.from({ length: ROWS }).map((_, row) => {
        const playerId = board[row][col];
        const player = players.find(p => p.id === playerId);
        const playerIndex = player ? players.findIndex(p => p.id === playerId) : -1;

        return (
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            playerId={playerId}
            playerIndex={playerIndex}
            currentPlayerIndex={currentPlayerIndex}
            players={players}
            onClick={() => {}}
          />
        );
      })}
    </button>
  );
}