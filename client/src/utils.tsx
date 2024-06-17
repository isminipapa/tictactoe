import { XorO } from "./types";

export const checkWinner = (
  board: (XorO | undefined)[][],
  size: number
): XorO | undefined => {
  const lines: (XorO | undefined)[][] = [];

  // Add horizontal and vertical lines
  for (let i = 0; i < size; i++) {
    lines.push(board[i]);
    lines.push(board.map((row) => row[i]));
  }

  // Add diagonal lines
  lines.push(board.map((row, idx) => row[idx]));
  lines.push(board.map((row, idx) => row[size - idx - 1]));

  for (const line of lines) {
    if (line.every((cell) => cell && cell === line[0])) {
      return line[0];
    }
  }

  return undefined;
};

export const isBoardFull = (board: (XorO | undefined)[][]): boolean => {
  return board.every((row) => row.every((cell) => cell !== undefined));
};
