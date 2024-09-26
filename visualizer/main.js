const visualizer = document.getElementById('visualizer');

function visualizeSorting(method) {
  stopAnimation = true;
  setTimeout(() => {
    stopAnimation = false;
    const array = generateRandomArray(30);
    generateBars(array, visualizer);
    const swaps = sortingMethod(method, array);
    animate(swaps);    
  }, 100)
}

function animate(swaps) {
   if (swaps.length == 0 || stopAnimation) {
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
  container.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
     const bar = document.createElement("div");
     bar.classList.add("bar");
     bar.style.height = array[i] * 100 + "%";
     container.appendChild(bar);
  }
}