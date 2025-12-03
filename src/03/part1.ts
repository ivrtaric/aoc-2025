import type { ReadStream } from 'fs';
import { findMaxJoltageForBatteries, parseLine } from 'src/03/utility';
import { parseFile } from 'src/common/utilities';

export async function lobby(puzzleInputFile: ReadStream): Promise<unknown> {
  let sum = 0n;

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;

    sum += findMaxJoltageForBatteries(parseLine(line), 2);
  });

  return sum;
}
