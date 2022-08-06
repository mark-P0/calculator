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
  },
  {
    text: '±',
    classes: ['input-button', 'input-button-top'],
  },
  {
    text: '%',
    classes: ['input-button', 'input-button-top'],
  },
  {
    text: '÷',
    classes: ['input-button', 'input-button-operator'],
  },
  {
    text: '7',
    classes: ['input-button'],
  },
  {
    text: '8',
    classes: ['input-button'],
  },
  {
    text: '9',
    classes: ['input-button'],
  },
  {
    text: '×',
    classes: ['input-button', 'input-button-operator'],
  },
  {
    text: '4',
    classes: ['input-button'],
  },
  {
    text: '5',
    classes: ['input-button'],
  },
  {
    text: '6',
    classes: ['input-button'],
  },
  {
    text: '−',
    classes: ['input-button', 'input-button-operator'],
  },
  {
    text: '1',
    classes: ['input-button'],
  },
  {
    text: '2',
    classes: ['input-button'],
  },
  {
    text: '3',
    classes: ['input-button'],
  },
  {
    text: '+',
    classes: ['input-button', 'input-button-operator'],
  },
  {
    text: '0',
    classes: ['input-button'],
  },
  {
    text: '.',
    classes: ['input-button'],
  },
  {
    text: '=',
    classes: ['input-button', 'input-button-operator'],
  },
];

/*  Approximation of the "fractional" plus-minus character
    https://stackoverflow.com/questions/18094826/is-there-a-unicode-character-for-plus-over-minus
 */
// InputDefinitions[1].text = '\u{207A}\u{2215}\u{208B}';

export default InputDefinitions;
