const RANGE_PARSE_REGEX = /^(?<from>\d+)-(?<to>\d+)$/;
export const parseLine = (line: string): Array<{ from: bigint; to: bigint }> => {
  return line.split(',').map(range => {
    const rangeResult = RANGE_PARSE_REGEX.exec(range);

    return {
      from: BigInt(rangeResult.groups.from),
      to: BigInt(rangeResult.groups.to)
    };
  });
};

export const findInvalidIds = (
  from: bigint,
  to: bigint,
  isInvalid: (bigint) => boolean
): Array<bigint> => {
  const result: Array<bigint> = [];
  for (let id = from; id <= to; id++) {
    if (isInvalid(id)) result.push(id);
  }

  return result;
};

export const isInvalid1 = (id: bigint): boolean => {
  const stringified = id.toString(10);

  if (stringified.length % 2 !== 0) return false;

  const halfway = Math.floor(stringified.length / 2);
  return stringified.substring(0, halfway) === stringified.substring(halfway);
};

export const isInvalid2 = (id: bigint): boolean => {
  const stringified = id.toString(10);
  const idLength = stringified.length;

  const halfway = Math.floor(idLength / 2);

  for (let patternLength = 1; patternLength <= halfway; patternLength++) {
    const pattern = stringified.substring(0, patternLength);

    let repeats = 2;
    while (true) {
      const checkLength = patternLength * repeats;
      if (checkLength > idLength) break;
      if (checkLength < idLength) {
        repeats++;
        continue;
      }

      const check = new Array(repeats).fill(pattern).join('');
      if (check === stringified) return true;

      repeats++;
    }
  }
  return false;
};
