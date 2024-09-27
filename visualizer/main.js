const visualizer = document.getElementById('visualizer');
let timeout = 100;

function alterTimeout(value) {
   timeout = timeout - value;
   console.log('timeout: ', timeout);
}

function visualizeSorting(method) {
  console.log(`starting ${method}`)
  stopAnimation = true;
  setTimeout(() => {
    stopAnimation = false;
    const array = generateRandomArray(30);
    console.log('Generated array:', array);
    generateBars(array, visualizer);
    const swaps = sortingMethod(method, array);
    console.log('Generated swaps:', swaps);
    animate(swaps);
  }, timeout);
}

function animate(swaps) {
   if (swaps == null || swaps.length == 0 || stopAnimation) {
      return;
   }
   const indices = swaps.shift();
   swapChildren(indices, visualizer.children);

   setTimeout(function () {
      animate(swaps);
   }, timeout);
}

function swapChildren([left, right], children) {
  
  const barLeft = children[left];
  const barLeftClone = barLeft.cloneNode(true);
  const barRight = children[right];
  const barRightClone = barRight.cloneNode(true);

  barRight.parentNode.replaceChild(barLeftClone, barRight);
  barLeft.parentNode.replaceChild(barRightClone, barLeft);
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
   const blue = Math.floor(255 * (1 - value));
   const red = Math.floor(255 * value);
   const hue = (1 - value) * 270;
   return `hsl(${hue}, 100%, 50%)`;
}