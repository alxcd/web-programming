const visualizer = document.getElementById('visualizer');
let timeout = 100;
let size = 30;
let keyScale = 61 / size;
document.getElementById('methodName').textContent = '';

function alterTimeout(value) {
   timeout = timeout > 1 ? timeout - value : 1;
   console.log('timeout: ', timeout);
}


function alterSize(value) {
  size = size + value;
  console.log('size: ', size);
}

function visualizeSorting(method) {
  console.log(`starting ${method}`);
  document.getElementById('methodName').textContent = method;
  stopAnimation = true;
  keyScale = 61 / size;
  setTimeout(() => {
    stopAnimation = false;
    const array = generateRandomArray(size);
    console.log('Generated array:', array);
    generateBars(array, visualizer);
    const swaps = sortingMethod(method, array);
    console.log('Generated swaps:', swaps);
    animate(swaps);
  }, timeout);
}

function sortingMethod(method, array) {
  const methods = {
    bubbleSort,
    insertionSort,
    quickSort,
    selectionSort,
    heapSort,
    combSort,
    shellSort,
    cocktailSort,
  }

  return methods[method]([...array]);
} 
 

function animate(swaps) {
   if (swaps == null || swaps.length == 0 || stopAnimation) {
      return;
   }
   const indices = swaps.shift();
   swapChildren(indices, visualizer.children);

   playSound(65 * Math.pow(2, keyScale * indices[0] / 12));
   playSound(65 * Math.pow(2, keyScale * indices[1] / 12));

   setTimeout(function () {
      animate(swaps);
   }, timeout);
}

function swapChildren([left, right], children) {
  const border = "2px solid black";

  const barLeft = children[left];
  const barRight = children[right];

  barLeft.style.border = border; // a bit bad if going back
  if (Math.abs(left-right) > 1) {
    barRight.style.border = border;
  }

  const barLeftClone = barLeft.cloneNode(true);
  const barRightClone = barRight.cloneNode(true);
  barRight.parentNode.replaceChild(barLeftClone, barRight);
  barLeft.parentNode.replaceChild(barRightClone, barLeft);

  setTimeout(() => {
    barLeftClone.style.border = "";
    barRightClone.style.border = "";
  }, timeout)
}


function generateBars(array, container) {
  container.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
     const bar = document.createElement("div");
     bar.classList.add("bar");
     bar.style.height = array[i] * 100 + "%";
     bar.style.backgroundColor = getColor(array[i]);
     container.appendChild(bar);
  }
}

function getColor(value) {
   const hue = (1 - value) * 270;
   return `hsl(${hue}, 100%, 50%)`;
}

