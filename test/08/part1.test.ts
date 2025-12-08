import { playground } from 'src/08/part1';
import { getFixtureStream } from 'test/utilities';
import { describe, expect, it } from 'vitest';

import { dir, EXPECTED_EXAMPLE_RESULT_1, title } from './constants';

describe(`AoC 2025 / ${title} / Part #1`, () => {
  it(`should return ${EXPECTED_EXAMPLE_RESULT_1} for the first puzzle input file`, async () => {
    const result = await playground(getFixtureStream(`2025-${dir}-example.txt`), 10, 3);

    expect(result).toEqual(EXPECTED_EXAMPLE_RESULT_1);
  });

  it('should return ?? for the second puzzle input file', async () => {
    const result = await playground(getFixtureStream(`2025-${dir}-own-input.txt`), 1000, 3);

    expect(result).toEqual(Infinity);
  });
});
