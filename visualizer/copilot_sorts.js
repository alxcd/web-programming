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