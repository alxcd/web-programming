const form = document.forms['calculatorForm'];

function getInputValues() {
  const numA = Number(form.num_a_input.value);
  const numB = Number(form.num_b_input.value);
  return {numA, numB}
}

function clearOutput() {
  document.getElementById('result_div').innerText = '';
  const canvas = document.getElementById('resultCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRightTriangle(ctx, a, b) {
  const canvas = document.getElementById('resultCanvas');
  const scaleX = canvas.width / a;
  const scaleY = canvas.height / b;
  const scale = Math.min(scaleX, scaleY);


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(a * scale, canvas.height);
  ctx.lineTo(0, canvas.height - b * scale);
  ctx.closePath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function setResult(operation) {
  const { numA, numB } = getInputValues();
  let result;
  let error = false;
  const canvas = document.getElementById('resultCanvas');
  const ctx = canvas.getContext('2d');
  switch (operation) {
    case 'add':
      result = `${numA} + ${numB} = ${numA + numB}`;
      break;
    case 'subtract':
      result = `${numA} - ${numB} = ${numA - numB}`;
      break;
    case 'multiply':
      result = `${numA} * ${numB} = ${numA * numB}`;
      break;
    case 'divide':
      if (numB === 0) {
        result = `${numA} / ${numB} = Error: Division by zero`;
        error = true;
      } else {
        result = `${numA} / ${numB} = ${numA / numB}`;
      }
      break;
    case 'hypotenuse':
      result = `Hypotenuse = ${Math.hypot(numA, numB)}`;
      drawRightTriangle(ctx, numA, numB)
      break;
    default:
      result = 'Invalid operation';
      error = true;
  }

  if (!error) {
    form.num_a_input.value = '';
    form.num_b_input.value = '';
  }

  document.getElementById('result_div').innerText = document.getElementById('result_div').innerText + '\n' + result;
}