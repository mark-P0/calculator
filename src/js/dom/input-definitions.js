import Display from './display.js';
import State from '../state.js';
import { operate } from '../operators.js';

/*  Intended layout is:
 *    [A C]  [ ± ]  [ % ]  [ ÷ ]
 *    [ 7 ]  [ 8 ]  [ 9 ]  [ × ]
 *    [ 4 ]  [ 5 ]  [ 6 ]  [ − ]
 *    [ 1 ]  [ 2 ]  [ 3 ]  [ + ]
 *    [ 0        ]  [ . ]  [ = ]
 */

const InputDefinitions = [
  {
    text: 'AC',
    classes: ['input-button', 'input-button-top'],
    callback: clearAll,
  },
  {
    text: '±',
    classes: ['input-button', 'input-button-top'],
    callback: undefined,
  },
  {
    text: '%',
    classes: ['input-button', 'input-button-top'],
    callback: undefined,
  },
  {
    text: '÷',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
  },
  {
    text: '7',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '8',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '9',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '×',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
  },
  {
    text: '4',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '5',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '6',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '−',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
  },
  {
    text: '1',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '2',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '3',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '+',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
  },
  {
    text: '0',
    classes: ['input-button'],
    callback: addDigitToDisplay,
  },
  {
    text: '.',
    classes: ['input-button'],
    callback: undefined,
  },
  {
    text: '=',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperatorEquals,
  },
];

/*  Approximation of the "fractional" plus-minus character
    https://stackoverflow.com/questions/18094826/is-there-a-unicode-character-for-plus-over-minus
 */
// InputDefinitions[1].text = '\u{207A}\u{2215}\u{208B}';

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/

function addDigitToDisplay(event) {
  const button = event.target;
  const digit = button.textContent;
  Display.text += digit;
}

function setOperator(event) {
  const button = event.target;
  const newOperatorSymbol = button.textContent;

  if (Display.isForClearing) return;

  if (State.operator === undefined) {
    State.storedValue = Display.textNumeric;
  } else {
    const op1 = State.storedValue;
    const op2 = Display.textNumeric;
    State.storedValue = operate(State.operator, op1, op2);
  }

  State.operator = newOperatorSymbol;
  Display.isForClearing = true;

  console.log(State);
}

function setOperatorEquals() {
  if (
    State.storedValue !== undefined &&
    State.operator !== undefined &&
    !Display.isForClearing
  ) {
    const op1 = State.storedValue;
    const op2 = Display.textNumeric;
    const res = operate(State.operator, op1, op2);
    Display.text = res.toString();
    console.log({ op1, op2, res });

    State.reset();
    Display.isForClearing = true;
  }
}

function clearAll() {
  State.reset();
  Display.reset();
}

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/

export default InputDefinitions;
