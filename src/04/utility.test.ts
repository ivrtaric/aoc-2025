import { describe, expect, it } from 'vitest';

import { findMaxJoltageForBatteries, parseLine } from './utility';

describe('parseLine', () => {
  (
    [
      [[9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n, 1n, 1n, 1n, 1n, 1n, 1n], '987654321111111'],
      [[8n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 9n], '811111111111119'],
      [[2n, 3n, 4n, 2n, 3n, 4n, 2n, 3n, 4n, 2n, 3n, 4n, 2n, 7n, 8n], '234234234234278'],
      [[8n, 1n, 8n, 1n, 8n, 1n, 9n, 1n, 1n, 1n, 1n, 2n, 1n, 1n, 1n], '818181911112111']
    ] as Array<[Array<bigint>, string]>
  ).forEach(([expected, value]) =>
    it(`should return ${JSON.stringify(expected)} for "${value}"`, () =>
      expect(parseLine(value)).toEqual(expected))
  );
});

describe('findMaxJoltageForBatteries', () => {
  describe('for 2 batteries', () => {
    (
      [
        [98n, [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n, 1n, 1n, 1n, 1n, 1n, 1n]],
        [89n, [8n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 9n]],
        [78n, [2n, 3n, 4n, 2n, 3n, 4n, 2n, 3n, 4n, 2n, 3n, 4n, 2n, 7n, 8n]],
        [92n, [8n, 1n, 8n, 1n, 8n, 1n, 9n, 1n, 1n, 1n, 1n, 2n, 1n, 1n, 1n]]
      ] as Array<[bigint, Array<bigint>]>
    ).forEach(([expected, value]) =>
      it(`should return ${JSON.stringify(expected)} for "${value}"`, () =>
        expect(findMaxJoltageForBatteries(value, 2)).toEqual(expected))
    );
  });

  describe('for 12 batteries', () => {
    (
      [
        [987654321111n, [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n, 1n, 1n, 1n, 1n, 1n, 1n]],
        [811111111119n, [8n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 9n]],
        [434234234278n, [2n, 3n, 4n, 2n, 3n, 4n, 2n, 3n, 4n, 2n, 3n, 4n, 2n, 7n, 8n]],
        [888911112111n, [8n, 1n, 8n, 1n, 8n, 1n, 9n, 1n, 1n, 1n, 1n, 2n, 1n, 1n, 1n]]
      ] as Array<[bigint, Array<bigint>]>
    ).forEach(([expected, value]) =>
      it(`should return ${JSON.stringify(expected)} for "${value}"`, () =>
        expect(findMaxJoltageForBatteries(value, 12)).toEqual(expected))
    );
  });
});
