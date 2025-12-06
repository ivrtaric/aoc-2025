import type { ReadStream } from 'fs';

import { loadData } from './utility';

export async function trashCompactor(puzzleInputFile: ReadStream): Promise<bigint> {
  const worksheet = await loadData(puzzleInputFile);

  let total = 0n;
  for (const [index, op] of worksheet.operations.entries()) {
    const subTotal = worksheet.numberLines
      .map(line => line[index])
      .reduce(
        (acc, curr) => (op === '*' ? acc * curr : op === '+' ? acc + curr : undefined),
        op === '*' ? 1n : 0n
      );
    total += subTotal;
  }

  return total;
}
