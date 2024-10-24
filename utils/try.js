import separateBoard from "./separateBoard.js";
import getFoldedBoardsPosition from "./getFoldedBoardsPosition.js";

const defaultBoard = [
  [0, 0, 0.01],
  [0, 36, 0.01],
  [36, 36, 0.01],
];

const axises = [
  [
    [0, 21.09, 0.01],
    [36, 36, 0.01],
  ],
];

const { leftBoard, rightBoard } = separateBoard(defaultBoard, axises[0]);
console.log(rightBoard);

const foldedBoards = getFoldedBoardsPosition([leftBoard], axises[0]);
console.log(foldedBoards);
