import { describe, expect, it } from 'vitest';

import { findInvalidIds, isInvalid1, isInvalid2, parseLine } from './utility';

describe('parseLine', () => {
  const line =
    '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

  it(`should return expected result for a given input line`, () => {
    expect(parseLine(line)).toEqual([
      { from: 11n, to: 22n },
      { from: 95n, to: 115n },
      { from: 998n, to: 1012n },
      { from: 1188511880n, to: 1188511890n },
      { from: 222220n, to: 222224n },
      { from: 1698522n, to: 1698528n },
      { from: 446443n, to: 446449n },
      { from: 38593856n, to: 38593862n },
      { from: 565653n, to: 565659n },
      { from: 824824821n, to: 824824827n },
      { from: 2121212118n, to: 2121212124n }
    ]);
  });
});

describe('findInvalidIds', () => {
  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };

  describe('Part 1', () => {
    (
      [
        [[11n, 22n], 11n, 22n],
        [[99n], 95n, 115n],
        [[1010n], 998n, 1012n],
        [[1188511885n], 1188511880n, 1188511890n],
        [[222222n], 222220n, 222224n],
        [[], 1698522n, 1698528n],
        [[446446n], 446443n, 446449n],
        [[38593859n], 38593856n, 38593862n],
        [[], 565653n, 565659n],
        [[], 824824821n, 824824827n],
        [[], 2121212118, 2121212124n]
      ] as Array<[Array<bigint>, bigint, bigint]>
    ).forEach(([expected, from, to]) =>
      it(`should return ${JSON.stringify(expected)} for ${from}-${to}`, () =>
        expect(findInvalidIds(from, to, isInvalid1)).toEqual(expected))
    );
  });

  describe('Part 2', () => {
    (
      [
        [[11n, 22n], 11n, 22n],
        [[99n, 111n], 95n, 115n],
        [[999n, 1010n], 998n, 1012n],
        [[1188511885n], 1188511880n, 1188511890n],
        [[222222n], 222220n, 222224n],
        [[], 1698522n, 1698528n],
        [[446446n], 446443n, 446449n],
        [[38593859n], 38593856n, 38593862n],
        [[565656n], 565653n, 565659n],
        [[824824824n], 824824821n, 824824827n],
        [[2121212121n], 2121212118n, 2121212124n]
      ] as Array<[Array<bigint>, bigint, bigint]>
    ).forEach(([expected, from, to]) =>
      it(`should return ${JSON.stringify(expected)} for ${from}-${to}`, () =>
        expect(findInvalidIds(from, to, isInvalid2)).toEqual(expected))
    );
  });
});

describe('isInvalid1', () => {
  (
    [
      [false, 0n],
      [true, 55n],
      [true, 99n],
      [false, 101n],
      [false, 111n],
      [false, 999n],
      [true, 1010n],
      [false, 565656n],
      [false, 824824824n],
      [true, 1188511885n]
    ] as Array<[boolean, bigint]>
  ).forEach(([expected, value]) =>
    it(`should return ${JSON.stringify(expected)} for ${value}`, () =>
      expect(isInvalid1(value)).toEqual(expected))
  );
});

describe('isInvalid2', () => {
  (
    [
      [false, 0n],
      [true, 55n],
      [true, 99n],
      [false, 101n],
      [true, 111n],
      [true, 999n],
      [true, 1010n],
      [true, 565656n],
      [true, 824824824n],
      [true, 1188511885n]
    ] as Array<[boolean, bigint]>
  ).forEach(([expected, value]) =>
    it(`should return ${JSON.stringify(expected)} for ${value}`, () =>
      expect(isInvalid2(value)).toEqual(expected))
  );
});
