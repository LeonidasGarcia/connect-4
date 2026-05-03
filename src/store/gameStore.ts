import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Player {
  id: string;
  color: string;
  name: string;
}

export interface TokenSets {
  player1: Set<string>;
  player2: Set<string>;
}

interface GameState {
  players: Player[];
  currentPlayerId: string;
  tokens: TokenSets;
  scores: Record<string, number>;
  localPlayerId: string | null;
  connected: boolean;
  roomId: string | null;
  error: string | null;

  connect: () => void;
  disconnect: () => void;
  makeMove: (col: number) => void;
}

const SERVER_URL = 'http://localhost:3000';

function createEmptyTokens(): TokenSets {
  return {
    player1: new Set<string>(),
    player2: new Set<string>(),
  };
}

let socket: Socket | null = null;

export const useGameStore = create<GameState>((set) => ({
  players: [],
  currentPlayerId: '',
  tokens: createEmptyTokens(),
  scores: {},
  localPlayerId: null,
  connected: false,
  roomId: null,
  error: null,

  connect: () => {
    if (socket?.connected) return;

    socket = io(SERVER_URL);

    socket.on('connect', () => {
      set({ connected: true, error: null });
      socket?.emit('joinRoom');
    });

    socket.on('disconnect', () => {
      set({
        connected: false,
        localPlayerId: null,
        players: [],
        tokens: createEmptyTokens(),
        scores: {},
      });
    });

    socket.on('playerIdAssigned', (data: { id: string }) => {
      set({ localPlayerId: data.id });
    });

    socket.on('gameStateChanged', (data: GameStateFromServer) => {
      set({
        players: data.players,
        currentPlayerId: data.currentPlayerId,
        tokens: {
          player1: new Set(data.tokens.player1),
          player2: new Set(data.tokens.player2),
        },
        scores: data.scores,
      });
    });

    socket.on('errorOccurred', (data: { message: string }) => {
      set({ error: data.message });
    });
  },

  disconnect: () => {
    socket?.disconnect();
    socket = null;
    set({
      connected: false,
      localPlayerId: null,
      players: [],
      tokens: createEmptyTokens(),
      scores: {},
      roomId: null,
      error: null,
    });
  },

  makeMove: (col: number) => {
    socket?.emit('makeMove', { col });
  },
}));

interface GameStateFromServer {
  players: Player[];
  currentPlayerId: string;
  scores: Record<string, number>;
  tokens: { player1: string[]; player2: string[] };
}
