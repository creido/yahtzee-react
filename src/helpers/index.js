/**
 *
 * @return {Array}        Sum of each index across the arrays
 */
export const sumArrays = (arrays) => {
  const results = [];
  const L = arrays.length;
  const count = arrays[0].length;

  let next = 0;

  while (next < count) {
    let sum = 0;
    let i = 0;

    while (i < L) {
        sum += Number(arrays[i++][next]);
    }

    results[next++] = sum;
  }

  return results;
};
