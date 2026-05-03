import { COLORS } from '../constants/colors';

/* Props del componente GameStatus. */
interface GameStatusProps {
  // Indica si es el turno del jugador actual.
  isCurrentPlayerTurn: number;
  // Jugador local (para comparar).
  localPlayer: number;
}

/* Mensajes según el estado del turno. */
const TURN_MESSAGE = '¡Tu Turno!';
const WAIT_MESSAGE = 'Espera';

/* Componente que muestra el estado del turno del jugador. */
export function GameStatus({
  isCurrentPlayerTurn,
  localPlayer,
}: GameStatusProps) {
  const isMyTurn = isCurrentPlayerTurn === localPlayer;
  const message = isMyTurn ? TURN_MESSAGE : WAIT_MESSAGE;
  const letters = message.split('');
  // Si es mi turno uso mi color, si no uso el color del otro jugador.
  const colorIndex = isMyTurn ? localPlayer : localPlayer === 1 ? 2 : 1;

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg sm:text-xl font-bold">
        {letters.map((letter, index) => (
          <span key={index} style={{ color: COLORS[colorIndex] }}>
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
