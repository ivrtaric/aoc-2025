import { playground } from 'src/08/part2';
import { getFixtureStream } from 'test/utilities';
import { describe, expect, it } from 'vitest';

import { dir, EXPECTED_EXAMPLE_RESULT_2, title } from './constants';

describe(`AoC 2025 / ${title} / Part #2`, () => {
  it(`should return ${EXPECTED_EXAMPLE_RESULT_2} for the first puzzle input file`, async () => {
    const result = await playground(getFixtureStream(`2025-${dir}-example.txt`));

    expect(result).toEqual(EXPECTED_EXAMPLE_RESULT_2);
  });

  it('should return ?? for the second puzzle input file', async () => {
    const result = await playground(getFixtureStream(`2025-${dir}-own-input.txt`));

    expect(result).toEqual(Infinity);
  });
});
