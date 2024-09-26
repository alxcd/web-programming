const visualizer = document.getElementById('visualizer');

function visualizeSorting(method) {
  const array = generateRandomArray(30);
  generateBars(array, visualizer);
  const swaps = sortingMethod(method, array);
  animate(swaps);  
}

function sortingMethod(method, array) {
  switch (method) {
    case 'bubbleSort':
      return bubbleSort([...array]);
    default:
      return null;
  }
}

function animate(swaps) {
   if (swaps.length == 0) {
      return;
   }
   const indices = swaps.shift();
   swapChildren(indices, visualizer.children);
  
   setTimeout(function () {
      animate(swaps);
   }, 100);
}

function swapChildren([left, right], children) {
   const barLeft = children[left];
   const barRight = children[right];
   visualizer.insertBefore(barRight, barLeft);
}

function generateBars(array, container) {
  for (let i = 0; i < array.length; i++) {
     const bar = document.createElement("div");
     bar.classList.add("bar");
     bar.style.height = array[i] * 100 + "%";
     container.appendChild(bar);
  }
}