import { COLORS } from '../constants/colors';

/* Titulo del juego con colores intercalados entre los jugadores. */
const TITLE = '¡Conecta 4!';

/* Componente que renderiza el titulo con colores alternados. */
export function GameTitle() {
  const letters = TITLE.split('');

  return (
    <h1 className="text-3xl sm:text-5xl font-bold mb-8">
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{ color: COLORS[(index % 2) + 1] }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}