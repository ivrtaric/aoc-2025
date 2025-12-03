import { lobby } from 'src/03/part1';
import { getFixtureStream } from 'test/utilities';
import { describe, expect, it } from 'vitest';

describe('AoC 2025 / Day 3: Lobby / Part #1', () => {
  const EXPECTED_RESULT_1 = 357n;

  it(`should return ${EXPECTED_RESULT_1} for the first puzzle input file`, async () => {
    const result = await lobby(getFixtureStream('2025-03-example.txt'));

    expect(result).toEqual(EXPECTED_RESULT_1);
  });

  it('should return ?? for the second puzzle input file', async () => {
    const result = await lobby(getFixtureStream('2025-03-own-input.txt'));

    expect(result).toEqual(Infinity);
  });
});
