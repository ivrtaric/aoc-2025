import type { ReadStream } from 'fs';
import { Location } from 'src/common/types';
import { isValidLocation, parseFile } from 'src/common/utilities';

import { Storage, StorageLine, StorageType } from './types';

const LINE_PARSE_REGEX = /^[@.]+$/;
export const parseLine = (line: string): StorageLine => {
  if (!LINE_PARSE_REGEX.test(line)) throw new Error(`Invalid line: ${line}`);
  return line.split('') as StorageLine;
};
export const loadBoard = async (puzzleInputFile: ReadStream): Promise<Storage> => {
  const board: Storage = [];

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;
    board.push(parseLine(line));
  });

  return board;
};

export const isAccessiblePaperRoll = (board: Storage, location: Location): boolean => {
  if (!isValidLocation(location, board)) return false;

  const [row, column] = location;
  if (board[row][column] !== StorageType.PAPER_ROLL) return false;

  return countAdjacentPaperRolls(board, location) < 4;
};

export const countAdjacentPaperRolls = (board: Storage, [row, column]: Location): number =>
  [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ].reduce(
    (counter, [dx, dy]) =>
      isValidLocation([row + dx, column + dy], board) &&
      board[row + dx][column + dy] === StorageType.PAPER_ROLL
        ? counter + 1
        : counter,
    0
  );

export const listAccessiblePaperRollLocations = (board: Storage): Array<Location> => {
  const accessiblePaperRolls: Array<Location> = [];

  for (const [row, rowItems] of board.entries()) {
    for (const [column] of rowItems.entries()) {
      if (isAccessiblePaperRoll(board, [row, column])) {
        accessiblePaperRolls.push([row, column]);
      }
    }
  }

  return accessiblePaperRolls;
};

export const removeAccessiblePaperRolls = (
  storage: Storage,
  accessiblePaperRolls: Array<Location>
) => {
  for (const [row, column] of accessiblePaperRolls) {
    storage[row][column] = StorageType.FLOOR;
  }
};
