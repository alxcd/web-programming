function sortingMethod(method, array) {
   switch (method) {
      case 'bubbleSort':
        return bubbleSort([...array]);
      case 'insertionSort':
        return insertionSort([...array]);
      default:
        console.error('Unknown sorting method:', method);
        return null;
   }
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


function generateRandomArray(size) {
  const array = new Array(size);
  for (let i = 0; i < size; i++) {
     array[i] = Math.random();
  }
  return array;
}
