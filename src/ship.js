export default function ship(length) {
  let sunk = false;
  let hitCount = 0;

  function isSunk() {
    sunk = length <= hitCount;
    return sunk;
  }

  function hit() {
    hitCount += 1;
    if (hitCount > length) return "This ship is already sunk";
    return hitCount;
  }

  return { length, isSunk, hit };
}
