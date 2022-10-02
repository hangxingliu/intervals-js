import { IntIntervals } from ".";

const max = 1000_000_000; // 1B in total
const maxInterval = 100; //  100 in an interval
const padding10 = (duration: any) => String(duration).padStart(10, " ");

[1000, 100 * 1000, 1000 * 1000].forEach(function (times) {
  const minMs = 10 * 1000; // 10 s
  let tInsertedElapsed = 0;
  let tDiffElapsed = 0;
  let tRemoveElapsed = 0;
  let tRounds = 0;

  // run:
  while (tInsertedElapsed < minMs && tDiffElapsed < minMs && tRemoveElapsed < minMs) {
    const intervals = new IntIntervals();

    {
      const lo = getIntArray(times, 0, max);
      const size = getIntArray(times, 0, maxInterval);
      const tick = performance.now();
      for (let i = 0; i < times; i++) intervals.add([lo[i], size[i]]);
      const tick2 = performance.now();
      tInsertedElapsed += tick2 - tick;
    }

    {
      const lo = getIntArray(times, 0, max);
      const size = getIntArray(times, 0, maxInterval);
      const tick = performance.now();
      for (let i = 0; i < times; i++) intervals.diff([lo[i], size[i]]);
      const tick2 = performance.now();
      tDiffElapsed += tick2 - tick;
    }

    {
      const lo = getIntArray(times, 0, max);
      const size = getIntArray(times, 0, Math.floor(maxInterval * 0.5));
      const tick = performance.now();
      for (let i = 0; i < times; i++) intervals.remove([lo[i], size[i]]);
      const tick2 = performance.now();
      tRemoveElapsed += tick2 - tick;
    }
    tRounds++;
  }


  // report:
  {
    const avgElapsed = tInsertedElapsed / tRounds;
    const avgPer1K = (avgElapsed * 1000) / times;
    console.log(
      `${padding10(`${avgElapsed.toFixed(2)}ms`)} `,
      `(${padding10(avgPer1K.toFixed(2))}ms/1k) `,
      `(rounds: ${padding10(tRounds)}) `,
      `Insert ${times} intervals`
    );
  }
  {
    const avgElapsed = tDiffElapsed / tRounds;
    const avgPer1K = (avgElapsed * 1000) / times;
    console.log(
      `${padding10(`${avgElapsed.toFixed(2)}ms`)} `,
      `(${padding10(avgPer1K.toFixed(2))}ms/1k) `,
      `(rounds: ${padding10(tRounds)}) `,
      `Calculate diff ${times} times`
    );
  }
  {
    const avgElapsed = tRemoveElapsed / tRounds;
    const avgPer1K = (avgElapsed * 1000) / times;
    console.log(
      `${padding10(`${avgElapsed.toFixed(2)}ms`)} `,
      `(${padding10(avgPer1K.toFixed(2))}ms/1k) `,
      `(rounds: ${padding10(tRounds)}) `,
      `Remove ${times} intervals`
    );
  }
  console.log("");
});

function getIntArray(length: number, min: number, max: number) {
  return new Array(length).fill(0).map(() => getInt(min, max));
}
function getInt(min: number, max: number) {
  const count = max - min + 1;
  return Math.floor(Math.random() * count + min);
}
