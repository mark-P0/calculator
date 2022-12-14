function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  const callbackMap = {
    '+': add,
    '−': subtract,
    '×': multiply,
    '÷': divide,
  };
  const callback = callbackMap[operator];
  return callback(num1, num2);
}

export { operate };
