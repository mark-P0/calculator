import Display from './display.js';

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
    callback: undefined,
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
    callback: undefined,
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
    callback: undefined,
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
    callback: undefined,
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
    callback: undefined,
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
    callback: undefined,
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

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/
export default InputDefinitions;
