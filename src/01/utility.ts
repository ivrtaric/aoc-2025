import { Direction, ParsedLine } from './types';

export const numberSortComparator = (a: number, b: number) => a - b;

const LINE_PARSE_REGEX = /^(?<direction>L|R)(?<amount>\d+)$/;
export const parseLine = (line: string): ParsedLine => {
  const result = LINE_PARSE_REGEX.exec(line);
  if (!result || !result.groups) throw new Error(`Couldn't parse line "${line}"`);

  return {
    direction: result.groups.direction as Direction,
    distance: parseInt(result.groups.amount, 10)
  };
};

export const MIN_DIAL = 0;
export const MAX_DIAL = 99;
export const turnDial = (
  dial: number,
  direction: ParsedLine['direction'],
  distance: ParsedLine['distance']
): { dial: number; zeroCrossed: number } => {
  const fullRotations = Math.floor(distance / (MAX_DIAL + 1));
  const actualDistance = distance % (MAX_DIAL + 1);

  let newDial = dial;
  let zeroCrossed = fullRotations;
  switch (direction) {
    case 'L': {
      newDial = dial - actualDistance;
      if (newDial < 0) {
        newDial = newDial + (MAX_DIAL + 1);
        if (dial !== 0 && newDial !== 0) zeroCrossed++;
      }
      break;
    }
    case 'R': {
      newDial = dial + actualDistance;
      if (newDial > MAX_DIAL) {
        newDial = newDial - (MAX_DIAL + 1);
        if (dial !== 0 && newDial !== 0) zeroCrossed++;
      }
      break;
    }
    default: {
      throw new Error('Invalid direction: ' + direction + '.');
    }
  }

  if (dial === 0 && newDial === 0) zeroCrossed--;
  return { dial: newDial, zeroCrossed };
};
