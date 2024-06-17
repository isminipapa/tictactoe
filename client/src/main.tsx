import React, { useState } from "react";
import { useGameStore } from "./store";

export const Main = () => {
  const {
    board,
    boardSize,
    currentPlayer,
    winner,
    handleClick,
    resetGame,
    setBoardSize,
  } = useGameStore();

  console.log("currentPlayer", currentPlayer);

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="font-bold text-xl">Time for {currentPlayer} to play</div>
      <div className="flex items-center gap-2">
        <label htmlFor="boardSize" className="font-bold">
          Board Size:
        </label>
        <input
          id="boardSize"
          type="number"
          min="3"
          max="15"
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
          className="border-2 border-gray-900 p-1 w-16 text-center"
        />
      </div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <div className="flex gap-1" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4 font-bold text-xl">
          {winner === "Draw" ? "No winner" : `Winner: ${winner}`}
        </div>
      )}

      <button
        className="mt-4 py-2 px-4 border-2 border-gray-900 text-xl"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};
