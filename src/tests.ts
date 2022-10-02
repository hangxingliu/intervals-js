import { stringify } from "circular-json";
import { deepStrictEqual } from "assert";
import { IntIntervals } from ".";

let debugInvoke = true;
const WITHOUT_ASSERT = Symbol("WITHOUT_ASSERT");

const manager = new IntIntervals();

debugInvoke = false;
assertFuncInvoke("add", manager.add, 0, [3, 4]);
assertFuncInvoke("getAll", manager.getAll, [[3, 4]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [3, 4, { v: 1 }]);
assertFuncInvoke("getAll", manager.getAll, [[3, 4, { v: 1 }]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [3, 4, { v: 1 }]);
assertFuncInvoke("add", manager.add, 1, [5, 6, { v: 2 }]);
assertFuncInvoke("getAll", manager.getAll, [[3, 6, { v: 2 }]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [3, 10, { v: 1 }]);
assertFuncInvoke("add", manager.add, 1, [2, 5, { v: 2 }]);
assertFuncInvoke("getAll", manager.getAll, [[2, 10, { v: 2 }]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [1, 10, { v: 1 }]);
assertFuncInvoke("add", manager.add, 1, [2, 5, { v: 2 }]);
assertFuncInvoke("getAll", manager.getAll, [[1, 10, { v: 2 }]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [1, 10]);
assertFuncInvoke("add", manager.add, 0, [2, 5]);
assertFuncInvoke("getAll", manager.getAll, [[1, 10]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [5, 10]);
assertFuncInvoke("add", manager.add, 0, [15, 20]);
assertFuncInvoke("add", manager.add, 0, [13, 13]);
assertFuncInvoke("add", manager.add, 2, [14, 14]);
assertFuncInvoke("add", manager.add, 2, [11, 17]);
assertFuncInvoke("getAll", manager.getAll, [[5, 20]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [5, 10]);
assertFuncInvoke("add", manager.add, 0, [15, 20]);
assertFuncInvoke("add", manager.add, 0, [13, 13]);
assertFuncInvoke("add", manager.add, 3, [5, 20]);
assertFuncInvoke("getAll", manager.getAll, [[5, 20]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [1, 5]);
assertFuncInvoke("add", manager.add, 1, [1, 6]);
assertFuncInvoke("getAll", manager.getAll, [[1, 6]]);
manager.clear();

//
// ======================================================
//

debugInvoke = false;
assertFuncInvoke("diff", manager.diff, [[1, 100]], [1, 100]);
assertFuncInvoke("add", manager.add, 0, [3, 7]);
assertFuncInvoke("add", manager.add, 0, [10, 20]);
assertFuncInvoke("add", manager.add, 0, [22, 30]);
assertFuncInvoke(
  "diff",
  manager.diff,
  [
    [2, 2],
    [8, 9],
    [21, 21],
  ],
  [2, 30]
);
assertFuncInvoke(
  "diff",
  manager.diff,
  [
    [2, 2],
    [8, 9],
    [21, 21],
    [31, 31],
  ],
  [2, 31]
);
manager.clear();

//
// ======================================================
//

debugInvoke = false;
assertFuncInvoke("add", manager.add, 0, [1, 5]);
assertFuncInvoke("add", manager.add, 0, [10, 15]);
assertFuncInvoke("add", manager.add, 0, [20, 25]);
assertFuncInvoke("remove", manager.remove, 2, [4, 12]);
assertFuncInvoke("remove", manager.getAll, [
  [1, 3],
  [13, 15],
  [20, 25],
]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [1, 5]);
assertFuncInvoke("add", manager.add, 0, [10, 15]);
assertFuncInvoke("add", manager.add, 0, [20, 25]);
assertFuncInvoke("remove", manager.remove, 2, [1, 15]);
assertFuncInvoke("getAll", manager.getAll, [[20, 25]]);
manager.clear();

assertFuncInvoke("add", manager.add, 0, [1, 5]);
assertFuncInvoke("add", manager.add, 0, [10, 15]);
assertFuncInvoke("remove", manager.remove, 1, [1, 5]);
assertFuncInvoke("getAll", manager.getAll, [[10, 15]]);
manager.clear();

assertFuncInvoke("remove", manager.remove, 0, [1, 100]);
assertFuncInvoke("getAll", manager.getAll, []);
manager.clear();


assertFuncInvoke("add", manager.add, 0, [1, 5]);
assertFuncInvoke("add", manager.add, 0, [10, 15]);
assertFuncInvoke("add", manager.add, 0, [20, 25]);
assertFuncInvoke("remove", manager.remove, 3, [1, 100]);
assertFuncInvoke("getAll", manager.getAll, []);
manager.clear();


//
// ======================================================
//

function assertFuncInvoke<P extends any[], R>(
  funcName: string,
  func: (...p: P) => R,
  expected: R | Symbol,
  ...params: P
) {
  let actual;
  try {
    actual = func(...params);
    if (expected !== WITHOUT_ASSERT) deepStrictEqual(actual, expected);
  } catch (error) {
    console.log(
      `Invoke function ${funcName}(${stringify(params).slice(1, -1)}) failed:`
    );
    console.log(`It returns ${stringify(actual)}`);
    throw error;
  }
  if (debugInvoke || expected === WITHOUT_ASSERT)
    console.log(
      `[debug] ${funcName}(${stringify(params).slice(1, -1)}) => ${stringify(
        actual
      )}`
    );
}
