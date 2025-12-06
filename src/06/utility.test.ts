import { ReadStream } from 'node:fs';
import { Readable } from 'node:stream';

import { describe, expect, it } from 'vitest';

import { loadData, parseWorksheetNumbers, parseWorksheetOperations } from './utility';

describe('parseWorksheetNumbers', () => {
  (
    [
      [[123n, 328n, 51n, 64n], '123 328  51 64  '],
      [[45n, 64n, 387n, 23n], ' 45 64  387 23  '],
      [[6n, 98n, 215n, 314n], '  6 98  215 314']
    ] as Array<[Array<bigint>, string]>
  ).forEach(([expected, line]) =>
    it(`should return ${JSON.stringify(expected)} for ${line}`, () =>
      expect(parseWorksheetNumbers(line)).toEqual(expected))
  );

  const opsLine = '*   +   *   +';
  it(`should throw an error for ${opsLine}`, () => {
    expect(() => parseWorksheetNumbers(opsLine)).toThrowError(`Couldn't parse line "${opsLine}"`);
  });
});

describe('parseWorksheetOperations', () => {
  ([[['*', '+', '*', '+'], '*   +   *   +']] as Array<[Array<string>, string]>).forEach(
    ([expected, line]) =>
      it(`should return ${JSON.stringify(expected)} for ${line}`, () =>
        expect(parseWorksheetOperations(line)).toEqual(expected))
  );
});

describe('loadData', () => {
  it(`should return expected data`, async () => {
    const worksheet = await loadData(
      Readable.from([
        [`123 328  51 64`, ` 45 64  387 23`, `  6 98  215 314`, `*   +   *   +`].join('\n')
      ]) as ReadStream
    );
    expect(worksheet).toEqual({
      numberLines: [
        [123n, 328n, 51n, 64n],
        [45n, 64n, 387n, 23n],
        [6n, 98n, 215n, 314n]
      ],
      operations: ['*', '+', '*', '+']
    });
  });
});
