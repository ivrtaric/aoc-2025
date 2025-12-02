import { giftShop } from 'src/02/part2';
import { getFixtureStream } from 'test/utilities';
import { describe, expect, it } from 'vitest';

describe('AoC 2025 / Day 2: Gift Shop / Part #2', () => {
  const EXPECTED_RESULT_1 = 4174379265n;

  it(`should return ${EXPECTED_RESULT_1} for the first puzzle input file`, async () => {
    const result = await giftShop(getFixtureStream('2025-02-example.txt'));

    expect(result).toEqual(EXPECTED_RESULT_1);
  });
  it('should return ?? for the second puzzle input file', async () => {
    const result = await giftShop(getFixtureStream('2025-02-own-input.txt'));

    expect(result).toEqual(Infinity);
  });
});
