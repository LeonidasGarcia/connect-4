# Connect-4 Game - Agent Instructions

## Project Overview
- **Stack**: React 19 + TypeScript + Vite + TailwindCSS v4 + Zustand + Framer Motion
- **Build tool**: Vite 8.x with React Compiler enabled

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (runs `tsc -b` typecheck first) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/         # React components (Board, Cell, Token, Column, Scoreboard, GameTitle, GameStatus)
├── constants/         # Colors, player constants
├── store/             # Zustand state management (gameStore.ts)
├── utils/             # Utilities (coordinates.ts)
├── App.tsx            # Main app component
├── index.css          # Tailwind + font imports
└── main.tsx           # Entry point
```

## Key Technical Details

- **State management**: Zustand store in `src/store/gameStore.ts` manages game state (tokens, currentPlayer, scores)
- **Coordinates**: Stored as `"${col},${row}"` strings (e.g., `"3,5"`), converted via `arrayToKey()` in `src/utils/coordinates.ts`
- **Gravity logic**: When clicking a column, tokens fall to the lowest available row
- **Responsive**: Mobile-first with `sm:` breakpoint at 640px
- **Font**: Jersey 10 loaded via Google Fonts in `index.css`

## Common Patterns

- **Board uses columns**: Clicking any cell in a column triggers gravity logic
- **Color system**: `COLORS` for player tokens, `BOARD_COLORS` for board background (player-specific)
- **Animations**: Framer Motion for board appearance and transitions; Tailwind transitions for cells

## Build Verification
Always run `npm run build` before finishing - it runs TypeScript typechecking + Vite build.

## Multiplayer (WebSocket)

The game has mock data in `gameStore.ts`. Real multiplayer requires Socket.IO integration:
- See `WEBSOCKET_SERVER_GUIDE.md` for the server protocol contract
- Client needs to connect to `ws://localhost:3000`, emit `join_room` and `make_move`, handle `game_state`, `player_id`, `error` events