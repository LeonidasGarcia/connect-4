import { motion } from 'framer-motion';
import { COLORS } from '../constants/colors';

/* Props del componente Token. */
interface TokenProps {
  // Jugador al que pertenece la ficha (1 o 2).
  player: number;
}

/* Componente que representa una ficha del jugador. */
export function Token({ player }: TokenProps) {
  const tokenColor = COLORS[player];

  return (
    <motion.div
      className="w-full h-full p-4 rounded-full"
      initial={{ scale: 0, y: -50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0, y: -50, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        backgroundColor: tokenColor,
        boxShadow: 'inset 0 4px 4px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          boxShadow:
            'inset 0 4px 2px rgba(0, 0, 0, 0.4), 0 0 2px rgba(0, 0, 0, 0.2)',
        }}
      />
    </motion.div>
  );
}