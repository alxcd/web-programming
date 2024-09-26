function bubbleSort(array) {
  const swaps = [];
  let somethingChanged;
  do {
     somethingChanged = false;
     for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
           [array[i - 1], array[i]] = [array[i], array[i - 1]];
           swaps.push([i - 1, i]);
           somethingChanged = true;
        }
     }
  } while (somethingChanged);
  return swaps;
}

function generateRandomArray(size) {
  const array = new Array(size);
  for (let i = 0; i < size; i++) {
     array[i] = Math.random();
  }
  return array;
}
