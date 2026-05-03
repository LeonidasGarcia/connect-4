import { create } from 'zustand';
import { PLAYER_1, PLAYER_2 } from '../constants/colors';
import { arrayToKey } from '../utils/coordinates';

/* Tipo para representar las coordenadas en formato [columna, fila]. */
export type Coordinate = [number, number];

/* Estado del juego. */
interface GameState {
  // Conjuntos de coordenadas de fichas de cada jugador.
  player1Tokens: Set<string>;
  player2Tokens: Set<string>;
  // Jugador con el turno actual (1 o 2).
  currentPlayer: number;
  // Puntuaciones de cada jugador.
  player1Score: number;
  player2Score: number;

  // Añade una ficha del jugador actual en las coordenadas especificadas.
  addToken: (col: number, row: number) => void;
  // Incrementa la puntuación del jugador especificado.
  incrementScore: (player: number) => void;
  // Cambia el turno al otro jugador.
  switchTurn: () => void;
  // Reinicia el juego: limpia las fichas, puntuaciones y vuelve al jugador 1.
  resetGame: () => void;
}

/* Estado inicial del juego. */
const initialState = {
  player1Tokens: new Set<string>(),
  player2Tokens: new Set<string>(),
  currentPlayer: PLAYER_1,
  player1Score: 0,
  player2Score: 0,
};

/* Store de Zustand para gestionar el estado del juego. */
export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  addToken: (col, row) => {
    const key = arrayToKey([col, row]);
    set((state) => {
      // Copia el Set actual y añade la nueva coordenada.
      const newTokens = new Set(
        state.currentPlayer === PLAYER_1
          ? state.player1Tokens
          : state.player2Tokens,
      );
      newTokens.add(key);

      return {
        ...(state.currentPlayer === PLAYER_1
          ? { player1Tokens: newTokens }
          : { player2Tokens: newTokens }),
      };
    });
  },

  incrementScore: (player) => {
    set((state) => ({
      ...(player === PLAYER_1
        ? { player1Score: state.player1Score + 1 }
        : { player2Score: state.player2Score + 1 }),
    }));
  },

  switchTurn: () => {
    set((state) => ({
      currentPlayer: state.currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1,
    }));
  },

  resetGame: () => {
    set({
      player1Tokens: new Set<string>(),
      player2Tokens: new Set<string>(),
      currentPlayer: PLAYER_1,
      player1Score: 0,
      player2Score: 0,
    });
  },
}));
