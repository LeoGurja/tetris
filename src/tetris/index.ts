import { create } from "zustand";
import { Floor } from "./objects/floor";
import { Piece } from "./objects/piece";
import { render } from "./render";
import { type BoardType } from "./types";
export { Piece } from "./objects/piece";
export { PieceType, type BlockType, type BoardType } from "./types";

interface TetrisState {
  piece: Piece;
  floor: Floor;
  score: number;
  isPaused: boolean;
  upcomingPiece: () => Piece;
  level: () => number;
  tickRate: () => number;
  ghostPiece: () => Piece;
  isRunning: () => boolean;
  isGameOver: () => boolean;
  board: () => BoardType;
}

interface TetrisActions {
  move: (x: number) => void;
  rotate: () => void;
  drop: () => void;
  update: () => void;
  playPause: () => void;
}

export const useTetris = create<TetrisState & TetrisActions>()((set, get) => ({
  ...defaultState(),
  level: () => Math.min(Math.floor(get().score / 1000), 15),
  tickRate: () => (0.8 - get().level() * 0.007) ** get().level() * 1000,
  ghostPiece: () => {
    let piece = get().piece;
    const floor = get().floor;
    while (!piece.collides(floor)) piece = piece.translate(0, 1);

    return piece.translate(0, -1);
  },
  board: () => render(get().piece, get().floor, get().ghostPiece()),
  upcomingPiece: () => Piece.peek(),
  isRunning: () => !get().isGameOver() && !get().isPaused,
  isGameOver: () => get().piece.collides(get().floor),
  playPause: () =>
    set((state) => {
      if (state.isGameOver()) return defaultState();
      return { isPaused: !state.isPaused };
    }),
  move: (x) =>
    set((state) => {
      if (!state.isRunning()) return {};
      const piece = state.piece.translate(x, 0);
      if (piece.collides(state.floor)) return {};
      return { piece };
    }),
  rotate: () =>
    set((state) => {
      if (!state.isRunning()) return {};
      const piece = state.piece.rotate();
      if (piece.collides(state.floor)) return {};

      return { piece };
    }),
  drop: () =>
    set((state) => {
      if (!state.isRunning()) return {};
      const score = state.score + state.floor.push(state.ghostPiece().blocks);
      return { score, piece: Piece.take() };
    }),
  update: () =>
    set((state) => {
      if (!state.isRunning()) return {};
      const floor = state.floor;
      const piece = state.piece.translate(0, 1);

      if (piece.collides(floor)) {
        const score = state.score + floor.push(state.piece.blocks);
        return {
          piece: Piece.take(),
          score,
        };
      } else {
        return { piece };
      }
    }),
}));

function defaultState() {
  return {
    score: 0,
    isPaused: false,
    floor: new Floor(),
    piece: Piece.take(),
  };
}
