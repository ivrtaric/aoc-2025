import type { ReadStream } from 'fs';
import { findInvalidIds, isInvalid2, parseLine } from 'src/02/utility';
import { parseFile } from 'src/common/utilities';

export async function giftShop(puzzleInputFile: ReadStream): Promise<bigint> {
  let sum = 0n;

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;

    const ranges = parseLine(line);
    for (const range of ranges) {
      const invalidIds = findInvalidIds(range.from, range.to, isInvalid2);
      sum = invalidIds.reduce((acc, curr) => acc + curr, sum);
    }
  });

  return sum;
}
