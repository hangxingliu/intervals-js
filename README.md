# Intervals

A mathematic class that contains operations with multiple intervals

## Install

```
npm install @hangxingliu/intervals
```

## Usage

``` javascript
import IntIntervals from "@hangxingliu/intervals";

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
```


## Benchmarks

```
> time node dist/intervals-manager-benchmarks.js

    0.14ms  (      0.14ms/1k)  (rounds:      29932)  Insert 1000 intervals
    0.11ms  (      0.11ms/1k)  (rounds:      29932)  Calculate diff 1000 times
    0.33ms  (      0.33ms/1k)  (rounds:      29932)  Remove 1000 intervals

   15.36ms  (      0.15ms/1k)  (rounds:        216)  Insert 100000 intervals
   14.10ms  (      0.14ms/1k)  (rounds:        216)  Calculate diff 100000 times
   46.39ms  (      0.46ms/1k)  (rounds:        216)  Remove 100000 intervals

  165.26ms  (      0.17ms/1k)  (rounds:         20)  Insert 1000000 intervals
  170.06ms  (      0.17ms/1k)  (rounds:         20)  Calculate diff 1000000 times
  518.91ms  (      0.52ms/1k)  (rounds:         20)  Remove 1000000 intervals


real	1m0.637s
user	1m0.510s
sys	0m1.933s
```
