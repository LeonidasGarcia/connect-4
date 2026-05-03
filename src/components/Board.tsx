import { motion } from 'framer-motion';
import { PLAYER_1_BOARD, PLAYER_2_BOARD } from '../constants/colors';
import { Column } from './Column';
import { useGameStore } from '../store/gameStore';
import { arrayToKey } from '../utils/coordinates';

// Propiedades que recibe el componente Board desde su padre.
interface BoardProps {
  // Jugador con el turno actual (1 o 2).
  currentPlayer: number;
}

// Filas y columnas del tablero.
const ROWS = 6;
const COLS = 7;

// Colores alternativos para el fondo del tablero segun el jugador.
const BOARD_COLORS: Record<number, string> = {
  1: PLAYER_1_BOARD,
  2: PLAYER_2_BOARD,
};

export function Board({ currentPlayer }: BoardProps) {
  // Obtiene los tokens de cada jugador desde la store.
  const player1Tokens = useGameStore((state) => state.player1Tokens);
  const player2Tokens = useGameStore((state) => state.player2Tokens);
  // Obtiene la función para añadir token desde la store.
  const addToken = useGameStore((state) => state.addToken);
  // Obtiene la función para cambiar turno desde la store.
  const switchTurn = useGameStore((state) => state.switchTurn);

  // Color del jugador actual, usado para el fondo del tablero.
  const currentColor = BOARD_COLORS[currentPlayer];

  // Calcula la fila más baja disponible en una columna (lógica de gravedad).
  const getLowestEmptyRow = (col: number): number | null => {
    // Busca desde la última fila (5) hacia arriba (0).
    for (let row = ROWS - 1; row >= 0; row--) {
      const key = arrayToKey([col, row]);
      if (!player1Tokens.has(key) && !player2Tokens.has(key)) {
        return row;
      }
    }
    // Si la columna está llena, retorna null.
    return null;
  };

  // Maneja el click en una columna (la ficha cae por gravedad).
  const handleColumnClick = (col: number) => {
    // Calcula la fila más baja disponible en esta columna.
    const lowestRow = getLowestEmptyRow(col);

    // Si la columna está llena, no hace nada.
    if (lowestRow === null) {
      return;
    }

    // Añade el token en la fila más baja disponible.
    addToken(col, lowestRow);
    // Cambia el turno.
    switchTurn();
  };

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
      {/* Contenedor interno del tablero con sombra interna. */}
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
        {/* Grid de 7 columnas clickeables. */}
        <div className="flex gap-4">
          {/* Renderiza las columnas del tablero */}
          {Array.from({ length: COLS }).map((_, col) => (
            <Column
              key={col}
              col={col}
              player1Tokens={player1Tokens}
              player2Tokens={player2Tokens}
              currentPlayer={currentPlayer}
              onColumnClick={handleColumnClick}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}