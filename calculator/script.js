const form = document.forms['calculatorForm'];

function getInputValues() {
  const numA = Number(form.num_a_input.value);
  const numB = Number(form.num_b_input.value);
  return {numA, numB}
}

function clearOutput() {
  document.getElementById('result_div').innerText = ''
}

function setResult(operation) {
  const { numA, numB } = getInputValues();
  let result;
  let error = false;
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