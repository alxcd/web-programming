function selectionSort(array) { // asked copilot for the whole method
  const swaps = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      swaps.push([i, minIndex]);
    }
  }
  return swaps;
}


function mergeSort(array) {
  const swaps = [];
  function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  function mergeSortHelper(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortHelper(arr.slice(0, mid));
    const right = mergeSortHelper(arr.slice(mid));
    return merge(left, right);
  }

  const sortedArray = mergeSortHelper(array);
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== sortedArray[i]) {
      swaps.push([i, sortedArray.indexOf(array[i])]);
      [array[i], array[sortedArray.indexOf(array[i])]] = [array[sortedArray.indexOf(array[i])], array[i]];
    }
  }
  return swaps;
}

function heapSort(array) {
  const swaps = [];
  function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps.push([i, largest]);
      heapify(arr, n, largest);
    }
  }

  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    swaps.push([0, i]);
    heapify(array, i, 0);
  }

  return swaps;
}

function shellSort(array) {
  const swaps = [];
  let gap = Math.floor(array.length / 2);
  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
        swaps.push([j, j - gap]);
      }
      array[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return swaps;
}

function countingSortByDigit(array, exp, swaps) {
  const output = new Array(array.length).fill(0);
  const count = new Array(10).fill(0);

  for (let i = 0; i < array.length; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = array.length - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    swaps.push([i, count[digit] - 1]);
    count[digit]--;
  }

  for (let i = 0; i < array.length; i++) {
    array[i] = output[i];
  }
}

function bucketSort(array) {
  const swaps = [];
  const bucketCount = Math.floor(Math.sqrt(array.length));
  const buckets = Array.from({ length: bucketCount }, () => []);

  const max = Math.max(...array);
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] / max) * (bucketCount - 1));
    buckets[bucketIndex].push(array[i]);
  }

  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
  }

  let index = 0;
  for (let i = 0; i < buckets.length; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      array[index++] = buckets[i][j];
    }
  }

  return swaps;
}

function combSort(array) {
  const swaps = [];
  let gap = array.length;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < array.length; i++) {
      if (array[i] > array[i + gap]) {
        [array[i], array[i + gap]] = [array[i + gap], array[i]];
        swaps.push([i, i + gap]);
        sorted = false;
      }
    }
  }

  return swaps;
}

function gnomeSort(array) {
  const swaps = [];
  let index = 0;

  while (index < array.length) {
    if (index === 0 || array[index] >= array[index - 1]) {
      index++;
    } else {
      [array[index], array[index - 1]] = [array[index - 1], array[index]];
      swaps.push([index, index - 1]);
      index--;
    }
  }

  return swaps;
}

function cocktailSort(array) {
  const swaps = [];
  let swapped = true;
  let start = 0;
  let end = array.length;

  while (swapped) {
    swapped = false;

    for (let i = start; i < end - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swaps.push([i, i + 1]);
        swapped = true;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    for (let i = end - 1; i >= start; i--) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swaps.push([i, i + 1]);
        swapped = true;
      }
    }

    start++;
  }

  return swaps;
}