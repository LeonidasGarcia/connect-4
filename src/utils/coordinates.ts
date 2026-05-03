/* Convierte un array de coordenadas [columna, fila] a una clave string "columna,fila". */
export function arrayToKey([col, row]: [number, number]): string {
  return `${col},${row}`;
}
