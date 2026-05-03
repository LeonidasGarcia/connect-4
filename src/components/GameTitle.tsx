import { motion } from 'framer-motion';
import { COLORS } from '../constants/colors';

/* Titulo del juego con colores intercalados entre los jugadores. */
const TITLE = '¡Conecta 4!';

/* Componente que renderiza el titulo con colores alternados. */
export function GameTitle() {
  const letters = TITLE.split('');

  return (
    <motion.h1
      className="font-bold"
      style={{ fontSize: '104px' }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ color: COLORS[(index % 2) + 1], display: 'inline-block' }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: index * 0.03,
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
