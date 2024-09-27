function sortingMethod(method, array) {
  return eval(`${method}([...array])`);
 } 

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

function insertionSort(array) {
  const swaps = [];
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j - 1] > array[j]) {
          [array[j - 1], array[j]] = [array[j], array[j - 1]];
          swaps.push([j - 1, j]);
      }
      else break;
    }
  }
  return swaps;
}

function quickSort(array) {
  const swaps = [];

  function recursion(start, end) {
    if (end - start <= 1) return;

    let pivotIndex = Math.floor((start + end) / 2);
    const pivot = array[pivotIndex];

    let left = start;
    let right = end - 1;

    while (left <= right) {
      while (array[left] < pivot) left++;
      while (array[right] > pivot) right--;

      if (left <= right) {
        if (left != right) {
          swaps.push([left, right]);
          [array[left], array[right]] = [array[right], array[left]];
        }
        left++;
        right--;
      }
    }

    recursion(start, right + 1);
    recursion(left, end);
  }

  recursion(0, array.length);
  return swaps;
}

function generateRandomArray(size) {
  const array = new Array(size);
  for (let i = 0; i < size; i++) {
     array[i] = Math.random();
  }
  return array;
}
