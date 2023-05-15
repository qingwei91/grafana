// this helper class is used to make typescript warn you when you forget
// a case-block in a switch statement.
// example code that triggers the typescript-error:
//
// const x:'A'|'B'|'C' = 'A';
//
// switch(x) {
//   case 'A':
//     // something
//   case 'B':
//     // something
//   default:
//     throw new NeverCaseError(x);
// }
//
//
// typescript will show an error in this case,
// when you add the missing `case 'C'` code,
// the problem will be fixed.

export class NeverCaseError extends Error {
  constructor(value: never) {
    super('should never happen');
  }
}

export function chunks<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}

export function chunkToPromise<T, O>(arr: T[], chunkSize: number, f: (arg: T, index: number) => O): Promise<O[]> {
  const promises: Array<Promise<O[]>> = chunks(arr, chunkSize).map(
    (chunk) =>
      new Promise((resolve) => {
        setTimeout(() => {
          const out = chunk.map(f);
          resolve(out);
        }, 0);
      })
  );
  const empty: O[] = [];
  return Promise.all(promises).then((outputChunks) => empty.concat(...outputChunks));
}
