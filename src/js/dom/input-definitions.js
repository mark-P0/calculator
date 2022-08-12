import Display from './display.js';
import State from '../state.js';
import { operate } from '../operators.js';

/*  Intended layout is:
 *    [A C]  [ ± ]  [ % ]  [ ÷ ]
 *    [ 7 ]  [ 8 ]  [ 9 ]  [ × ]
 *    [ 4 ]  [ 5 ]  [ 6 ]  [ − ]
 *    [ 1 ]  [ 2 ]  [ 3 ]  [ + ]
 *    [ 0        ]  [ . ]  [ = ]
 *
 *  `buttonElement` will be defined on actual button creation
 */

const InputDefinitions = [
  {
    text: 'AC',
    classes: ['input-button', 'input-button-top'],
    callback: clearAll,
    buttonElement: undefined,
  },
  {
    text: '±',
    classes: ['input-button', 'input-button-top'],
    callback: toggleNegative,
    buttonElement: undefined,
  },
  {
    text: '%',
    classes: ['input-button', 'input-button-top'],
    callback: setOperatorPercentage,
    buttonElement: undefined,
  },
  {
    text: '÷',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
    buttonElement: undefined,
  },
  {
    text: '7',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '8',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '9',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '×',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
    buttonElement: undefined,
  },
  {
    text: '4',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '5',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '6',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '−',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
    buttonElement: undefined,
  },
  {
    text: '1',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '2',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '3',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '+',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperator,
    buttonElement: undefined,
  },
  {
    text: '0',
    classes: ['input-button'],
    callback: addDigitToDisplay,
    buttonElement: undefined,
  },
  {
    text: '.',
    classes: ['input-button'],
    callback: addRadixPoint,
    buttonElement: undefined,
  },
  {
    text: '=',
    classes: ['input-button', 'input-button-operator'],
    callback: setOperatorEquals,
    buttonElement: undefined,
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

function addRadixPoint() {
  Display.text += '.';
}

function setOperator(event) {
  if (
    // State.storedValue === undefined ||
    // State.operator === undefined ||
    Display.isForClearing ||
    // Display.text === Display.textDefault ||
    false
  )
    return;

  const button = event.target;
  const newOperatorSymbol = button.textContent;

  if (State.operator === '÷' && Display.textNumeric === 0) {
    Display.setEmoji('🤯');
    State.reset();
    Display.isForClearing = true;
    return;
  } else if (State.operator === undefined) {
    State.storedValue = Display.textNumeric;
  } else {
    const op1 = State.storedValue;
    const op2 = Display.textNumeric;
    const res = operate(State.operator, op1, op2);
    Display.text = res.toString();
    State.storedValue = res;
  }

  State.operator = newOperatorSymbol;
  Display.isForClearing = true;

  console.log(State);
}

function setOperatorEquals() {
  if (
    State.storedValue === undefined ||
    State.operator === undefined ||
    Display.isForClearing ||
    // Display.text === Display.textDefault
    false
  )
    return;

  if (State.operator === '÷' && Display.textNumeric === 0) {
    return Display.setEmoji('🤯');
  }

  const op1 = State.storedValue;
  const op2 = Display.textNumeric;
  const res = operate(State.operator, op1, op2);
  Display.text = res.toString();

  console.log({ op1, op2, res });

  State.reset();
  Display.isForClearing = true;
}

function setOperatorPercentage() {
  /*  Transform the second operand into a percentage of the first operand
   *
   *                            Transformation        Simplification
   *        Addition | A + B% | A + (A * B/100) | [ A * (1 + B/100)     ]
   *     Subtraction | A - B% | A - (A * B/100) | [ A * (1 - B/100)     ]
   *  Multiplication | A * B% | A * (A * B/100) | [ A² * B/100          ]
   *        Division | A / B% | A / (A * B/100) | [ 1/(B/100) === 100/B ]
   *
   *  https://devblogs.microsoft.com/oldnewthing/20080110-00/?p=23853
   *  https://sciencing.com/use-percentage-key-calculator-6188449.html
   */

  if (
    State.storedValue === undefined ||
    State.operator === undefined ||
    Display.isForClearing ||
    Display.text === Display.textDefault ||
    false
  )
    return;

  const op1 = State.storedValue;
  const op2 = Display.textNumeric;
  const res = op1 * (op2 / 100);
  Display.text = res.toString();
}

function clearAll() {
  State.reset();
  Display.reset();
}

function toggleNegative() {
  Display.text = (Number.parseFloat(Display.text) * -1).toString();
}

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/

document.addEventListener('keydown', (event) => {
  const { key } = event;

  const def = InputDefinitions.find(({ text }) => text === key);
  if (def === undefined) return;

  console.log(def);
  console.log(def.buttonElement);
});

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/

export default InputDefinitions;
