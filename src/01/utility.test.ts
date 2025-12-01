import { ParsedLine } from 'src/01/types';
import { describe, expect, it } from 'vitest';

import { parseLine, turnDial } from './utility';

describe('parseLine', () => {
  (
    [
      [{ direction: 'L', distance: 68 }, 'L68'],
      [{ direction: 'L', distance: 30 }, 'L30'],
      [{ direction: 'R', distance: 48 }, 'R48'],
      [{ direction: 'L', distance: 5 }, 'L5'],
      [{ direction: 'R', distance: 60 }, 'R60'],
      [{ direction: 'L', distance: 55 }, 'L55'],
      [{ direction: 'L', distance: 1 }, 'L1'],
      [{ direction: 'L', distance: 99 }, 'L99'],
      [{ direction: 'R', distance: 14 }, 'R14'],
      [{ direction: 'L', distance: 82 }, 'L82']
    ] as Array<[ParsedLine, string]>
  ).forEach(([expected, line]) =>
    it(`should return ${JSON.stringify(expected)} for ${line}`, () =>
      expect(parseLine(line)).toEqual(expected))
  );
});

describe('turnDial', () => {
  type TurnDialArgs = Parameters<typeof turnDial>;
  type TurnDialResult = ReturnType<typeof turnDial>;

  (
    [
      [{ dial: 99, zeroCrossed: 0 }, [0, 'L', 1]],
      [{ dial: 1, zeroCrossed: 0 }, [0, 'L', 99]],
      [{ dial: 0, zeroCrossed: 0 }, [0, 'L', 100]],
      [{ dial: 99, zeroCrossed: 1 }, [0, 'L', 101]],
      [{ dial: 0, zeroCrossed: 1 }, [0, 'L', 200]],

      [{ dial: 99, zeroCrossed: 0 }, [0, 'R', 99]],
      [{ dial: 0, zeroCrossed: 0 }, [0, 'R', 100]],
      [{ dial: 1, zeroCrossed: 1 }, [0, 'R', 101]],
      [{ dial: 0, zeroCrossed: 1 }, [0, 'R', 200]],

      [{ dial: 0, zeroCrossed: 1 }, [1, 'L', 101]],

      [{ dial: 0, zeroCrossed: 0 }, [99, 'R', 1]],
      [{ dial: 98, zeroCrossed: 1 }, [99, 'R', 99]],
      [{ dial: 99, zeroCrossed: 1 }, [99, 'R', 100]],
      [{ dial: 0, zeroCrossed: 1 }, [99, 'R', 101]],
      [{ dial: 50, zeroCrossed: 10 }, [50, 'R', 1000]],

      [{ dial: 82, zeroCrossed: 1 }, [50, 'L', 68]],
      [{ dial: 52, zeroCrossed: 0 }, [82, 'L', 30]],
      [{ dial: 0, zeroCrossed: 0 }, [52, 'R', 48]],
      [{ dial: 95, zeroCrossed: 0 }, [0, 'L', 5]],
      [{ dial: 55, zeroCrossed: 1 }, [95, 'R', 60]],
      [{ dial: 0, zeroCrossed: 0 }, [55, 'L', 55]],
      [{ dial: 99, zeroCrossed: 0 }, [0, 'L', 1]],
      [{ dial: 0, zeroCrossed: 0 }, [99, 'L', 99]],
      [{ dial: 14, zeroCrossed: 0 }, [0, 'R', 14]],
      [{ dial: 32, zeroCrossed: 1 }, [14, 'L', 82]]
    ] as Array<[TurnDialResult, TurnDialArgs]>
  ).forEach(([expected, args]) =>
    it(`should return ${JSON.stringify(expected)} for ${args}`, () =>
      expect(turnDial(...args)).toEqual(expected))
  );
});
