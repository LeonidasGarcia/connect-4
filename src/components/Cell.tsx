import { COLORS, PLAYER_1_BOARD, PLAYER_2_BOARD } from '../constants/colors';

/* Propiedades de cada celda individual del tablero. */
interface CellProps {
  // Fila de la celda en el tablero (0-5).
  row: number;
  // Columna de la celda en el tablero (0-6).
  col: number;
  // Jugador que ocupa la celda (null si esta vacía).
  player: number | null;
  // Jugador con el turno actual.
  currentPlayer: number;
  // Callback ejecutado al hacer click en la celda.
  onClick: (row: number, col: number) => void;
}

/* Colores alternativos para el fondo del tablero. */
const BOARD_COLORS: Record<number, string> = {
  1: PLAYER_1_BOARD,
  2: PLAYER_2_BOARD,
};

/* Componente que representa una celda del tablero. */
export function Cell({ row, col, player, currentPlayer, onClick }: CellProps) {
  // Verifica si la celda esta vacía.
  const isEmpty = player === null;
  // Color del jugador que ocupa la celda (si hay uno).
  const playerColor = player ? COLORS[player] : undefined;
  // Color alternativo del jugador actual para celdas vacías.
  const currentColor = BOARD_COLORS[currentPlayer];

  return (
    // Botón con la celda, cambia de color según si esta vacía o tiene un jugador.
    <button
      className="w-10 h-10 sm:w-16 sm:h-16 p-0.5 sm:p-1 rounded-full transition-colors duration-300"
      style={{
        backgroundColor: isEmpty ? currentColor : playerColor,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}
      onClick={() => onClick(row, col)}
      type="button"
    >
      {/* Círculo interior con sombra para efecto 3D. */}
      <div className="w-full h-full rounded-full sm:shadow-[inset_0_16px_4px_rgba(0,0,0,0.4)] shadow-[inset_0_8px_4px_rgba(0,0,0,0.4)]" />
    </button>
  );
}
