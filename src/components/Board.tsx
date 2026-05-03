import { COLORS } from '../constants/colors';
import { Cell } from './Cell';

// Propiedades que recibe el componente Board desde su padre.
interface BoardProps {
  // Jugador con el turno actual (1 o 2).
  currentPlayer: number;
}

// Filas y columnas del tablero.
const ROWS = 6;
const COLS = 7;

export function Board({ currentPlayer }: BoardProps) {
  // Color del jugador actual, usado para el fondo del tablero.
  const currentColor = COLORS[currentPlayer];

  const handleCellClick = (row: number, col: number) => {
    // Evento para reaccionar al click del jugador con turno actual.
    console.log(`Columna: ${col}, Fila: ${row}`);
  };

  return (
    // Contenedor exterior del tablero con padding y sombra proyectada.
    <div
      className="p-1 rounded-2xl sm:rounded-3xl transition-colors duration-300"
      style={{
        backgroundColor: currentColor,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Contenedor interno del tablero con sombra interna. */}
      <div
        className="p-4 rounded-2xl sm:rounded-3xl"
        style={{
          backgroundColor: currentColor,
          boxShadow:
            'inset 4px 4px 4px rgba(0, 0, 0, 0.4), inset -4px -4px 4px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Grid de 7 columnas y 6 filas con las celdas. */}
        <div className="grid grid-cols-7 grid-rows-6 grid-flow-col gap-4">
          {/* Ninguna celda esta atada a un estado en especifico, solo escuchan eventos */}
          {Array.from({ length: COLS }).map((_, col) =>
            Array.from({ length: ROWS }).map((_, row) => (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                player={null}
                currentPlayer={currentPlayer}
                onClick={handleCellClick}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
