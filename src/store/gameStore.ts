import { create } from 'zustand';

export interface Player {
  id: string;
  color: string;
  name: string;
}

export type Board = (string | null)[][];

interface GameState {
  players: Player[];
  currentPlayerId: string;
  board: Board;
  scores: Record<string, number>;
  localPlayerId: string | null;
  connected: boolean;
  roomId: string | null;
  error: string | null;

  connect: (roomId: string) => void;
  disconnect: () => void;
  makeMove: (col: number) => void;
}

const ROWS = 6;
const COLS = 7;

function createEmptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

const mockPlayers: Player[] = [
  { id: 'player1', color: '#D54117', name: 'Jugador 1' },
  { id: 'player2', color: '#EBB441', name: 'Jugador 2' },
];

const mockBoard: Board = createEmptyBoard();
const mockScores: Record<string, number> = {
  player1: 0,
  player2: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  players: mockPlayers,
  currentPlayerId: mockPlayers[0].id,
  board: mockBoard,
  scores: mockScores,
  localPlayerId: 'player1',
  connected: false,
  roomId: null,
  error: null,

  connect: (roomId: string) => {
    set({ roomId, connected: true, error: null });
  },

  disconnect: () => {
    set({
      connected: false,
      roomId: null,
      board: createEmptyBoard(),
      scores: { player1: 0, player2: 0 },
    });
  },

  makeMove: (col: number) => {
    const { board, currentPlayerId } = get();

    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = currentPlayerId;

        const newScores = { ...get().scores };
        newScores[currentPlayerId] = newScores[currentPlayerId] || 0;

        const { players } = get();
        const nextPlayer = players.find((p) => p.id !== currentPlayerId);

        set({
          board: newBoard,
          scores: newScores,
          currentPlayerId: nextPlayer?.id || currentPlayerId,
        });
        break;
      }
    }
  },
}));
