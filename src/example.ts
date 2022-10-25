import IntIntervals from ".";

console.log(IntIntervals.subtract([10, 100], [15, 20])); // [ [ 10, 14 ], [ 21, 100 ] ]

const it = new IntIntervals();
it.add([1, 10]);
it.add([15, 20]);
it.add([11, 14]);
console.log(it.getAll()); // [ [ 1, 20 ] ]
console.log(it.has(20)); // true
console.log(it.has([1, 20])); // true

it.remove([10, 12]);
console.log(it.getAll()); // [ [ 1, 9 ], [ 13, 20 ] ]

console.log(it.diff([5, 25])); // [ [ 10, 12 ], [ 21, 25 ] ]
