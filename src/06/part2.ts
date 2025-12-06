import type { ReadStream } from 'fs';
import { loadLines } from 'src/common/utilities';

export async function trashCompactor(puzzleInputFile: ReadStream): Promise<bigint> {
  const lines = (await loadLines(puzzleInputFile)).filter(line => line !== '');
  // Operations list is always the last line
  const operations = lines.pop();

  let total = 0n;
  let currentIndex = 0;
  while (true) {
    // Since we have only additions and multiplications, and the final answer is an addition of
    // subtotals, we can (mostly) ignore the "right-to-left" requirement of the puzzle, due to the
    // commutativity of addition and multiplication.
    // If we had subtractions and/or divisions, it would be another matter entirely...
    const nextIndex = getNextOperationIndex(operations, currentIndex);

    const digits = lines.map(line => line.substring(currentIndex, nextIndex).split(''));
    const numberCount = Math.max(...digits.map(d => d.length));
    const numbers: Array<bigint> = [];
    for (let i = numberCount - 1; i >= 0; i--) {
      const n = digits
        .map(digit => digit[i])
        .join('')
        .trim();
      if (n === '') continue;
      numbers.push(BigInt(n));
    }

    const currentOp = operations[currentIndex];
    total += numbers.reduce(
      (acc, cur) => (currentOp === '*' ? acc * cur : acc + cur),
      currentOp === '*' ? 1n : 0n
    );

    if (nextIndex === Infinity) break;
    currentIndex = nextIndex;
  }

  return total;
}

function getNextOperationIndex(operations: string, currentIndex: number): number {
  let nextIndex = currentIndex + 1;
  while (true) {
    if (operations[nextIndex] === ' ') nextIndex++;
    else if (operations[nextIndex] === '\n' || operations[nextIndex] === undefined) {
      nextIndex = Infinity;
      break;
    } else break;
  }

  return nextIndex;
}
