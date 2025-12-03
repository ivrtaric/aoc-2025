BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

export const parseLine = (line: string): Array<bigint> => {
  return line.split('').map(value => BigInt(value));
};

const MAX_JOLTAGE_CACHE = new Map<number, bigint>();
const JOLTAGE_CACHE = new Map<string, bigint>();
const warmUpCache = (bankJoltages: Array<bigint>) => {
  JOLTAGE_CACHE.clear();
  MAX_JOLTAGE_CACHE.clear();
  for (let index = 0; index < bankJoltages.length; index++) {
    const max = bankJoltages
      .slice(index)
      .reduce((max, joltage) => (joltage > max ? joltage : max), -1n);
    MAX_JOLTAGE_CACHE.set(index, max);
  }
};
export const findMaxJoltageForBatteries = (
  bankJoltages: Array<bigint>,
  batteryCount: number,
  currentIndex: number = 0
): bigint => {
  if (currentIndex === 0) warmUpCache(bankJoltages);
  if (batteryCount === 1) return MAX_JOLTAGE_CACHE.get(currentIndex);

  const key = `${currentIndex},${batteryCount}`;
  const cached = JOLTAGE_CACHE.get(key);
  if (cached) return cached;

  let max = 0n;
  for (let index = currentIndex; index < bankJoltages.length - batteryCount + 1; index++) {
    const base = bankJoltages[index];
    const maxForJoltage = findMaxJoltageForBatteries(bankJoltages, batteryCount - 1, index + 1);

    const value = BigInt(`${base}${maxForJoltage}`);
    if (value > max) max = value;
  }

  JOLTAGE_CACHE.set(key, max);
  return max;
};
