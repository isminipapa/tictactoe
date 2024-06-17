import { create } from "zustand";
import { XorO } from "./types";
import { checkWinner, isBoardFull } from "./utils";

interface GameState {
  board: (XorO | undefined)[][];
  boardSize: number;
  currentPlayer: XorO;
  winner: XorO | "Draw" | undefined;
  handleClick: (row: number, col: number) => void;
  resetGame: () => void;
  setBoardSize: (size: number) => void;
}

const initializeBoard = (size: number): (XorO | undefined)[][] =>
  Array(size)
    .fill(undefined)
    .map(() => Array(size).fill(undefined));

export const useGameStore = create<GameState>((set) => ({
  board: initializeBoard(3),
  boardSize: 3,
  currentPlayer: "X",
  winner: undefined,
  handleClick: (row, col) =>
    set((state) => {
      if (state.board[row][col] || state.winner) return state;

      const newBoard = state.board.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? state.currentPlayer : cell
        )
      );

      const gameWinner = checkWinner(newBoard, state.boardSize);
      const draw = !gameWinner && isBoardFull(newBoard);

      return {
        board: newBoard,
        currentPlayer:
          gameWinner || draw
            ? state.currentPlayer
            : state.currentPlayer === "X"
            ? "O"
            : "X",
        winner: gameWinner || (draw ? "Draw" : undefined),
      };
    }),
  resetGame: () =>
    set((state) => ({
      board: initializeBoard(state.boardSize),
      currentPlayer: "X",
      winner: undefined,
    })),
  setBoardSize: (size) =>
    set(() => ({
      boardSize: size,
      board: initializeBoard(size),
      currentPlayer: "X",
      winner: undefined,
    })),
}));
