import { PLAYER_1 } from '../constants/colors';
import { Cell } from './Cell';
import { arrayToKey } from '../utils/coordinates';

/* Props del componente Column. */
interface ColumnProps {
  // Índice de la columna.
  col: number;
  // Tokens del jugador 1.
  player1Tokens: Set<string>;
  // Tokens del jugador 2.
  player2Tokens: Set<string>;
  // Jugador con el turno actual.
  currentPlayer: number;
  // Callback cuando se hace click en la columna.
  onColumnClick: (col: number) => void;
}

// Filas del tablero.
const ROWS = 6;

/* Componente que representa una columna clickeable del tablero. */
export function Column({
  col,
  player1Tokens,
  player2Tokens,
  currentPlayer,
  onColumnClick,
}: ColumnProps) {
  // Determina qué jugador ocupa una celda (null si está vacía).
  const getPlayerAtCell = (row: number): number | null => {
    const key = arrayToKey([col, row]);
    if (player1Tokens.has(key)) {
      return PLAYER_1;
    }
    if (player2Tokens.has(key)) {
      return 2;
    }
    return null;
  };

  return (
    <button
      className="flex flex-col gap-4"
      onClick={() => onColumnClick(col)}
      type="button"
    >
      {/* Renderiza las celdas de la columna (de arriba a abajo). */}
      {Array.from({ length: ROWS }).map((_, row) => (
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
          player={getPlayerAtCell(row)}
          currentPlayer={currentPlayer}
          onClick={() => {}}
        />
      ))}
    </button>
  );
}