const visualizer = document.getElementById('visualizer');
let timeout = 100;
let size = 30;

function alterTimeout(value) {
   timeout = timeout > 1 ? timeout - value : 1;
   console.log('timeout: ', timeout);
}


function alterSize(value) {
  size = size + value;
  console.log('size: ', size);
}

function visualizeSorting(method) {
  console.log(`starting ${method}`)
  stopAnimation = true;
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

function animate(swaps) {
   if (swaps == null || swaps.length == 0 || stopAnimation) {
      return;
   }
   const indices = swaps.shift();
   swapChildren(indices, visualizer.children);

   const keyScale = 61 / size;
   playSound(65 * Math.pow(2, keyScale * indices[0] / 12));
   playSound(65 * Math.pow(2, keyScale * indices[1] / 12));

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
   const hue = (1 - value) * 270;
   return `hsl(${hue}, 100%, 50%)`;
}