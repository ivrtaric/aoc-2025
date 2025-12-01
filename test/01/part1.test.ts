import { secretEntrance } from 'src/01/part1';
import { getFixtureStream } from 'test/utilities';
import { describe, expect, it } from 'vitest';

describe('AoC 2025 / Day 1: Secret Entrance / Part #1', () => {
  const EXPECTED_RESULT_1 = 3;

  it(`should return ${EXPECTED_RESULT_1} for the first puzzle input file`, async () => {
    const result = await secretEntrance(getFixtureStream('2025-01-example.txt'));

    expect(result).toEqual(EXPECTED_RESULT_1);
  });

  it('should return ?? for the second puzzle input file', async () => {
    const result = await secretEntrance(getFixtureStream('2025-01-own-input.txt'));

    expect(result).toEqual(Infinity);
  });
});
