import { useMemo } from "react";
import { BlockType, useTetris } from "../tetris";
import { Cell } from "./Cell";

export function UpcomingPiece() {
  const upcomingPiece = useTetris((t) => t.upcomingPiece());

  const board = useMemo(() => {
    const board = Array(4)
      .fill([])
      .map(() => ["", "", "", ""] as BlockType[]);

    upcomingPiece.blocks.forEach((b) => {
      board[b.y][b.x] = b.type;
    });

    return board;
  }, [upcomingPiece]);

  return (
    <div className="rounded-2xl p-2 select-none bg-neutral-900 w-28">
      {board.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} upcoming type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
