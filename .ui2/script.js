const keys = [
  ['AC'],
  ['±'],
  ['%'],
  ['÷'],
  ['7'],
  ['8'],
  ['9'],
  ['×'],
  ['4'],
  ['5'],
  ['6'],
  ['−'],
  ['1'],
  ['2'],
  ['3'],
  ['+'],
  ['0'],
  ['.'],
  ['='],
];
const keypad = document.getElementById('keypad');

for (const [text] of keys) {
  const key = document.createElement('div');
  key.classList.toggle('key');
  key.textContent = text;

  keypad.appendChild(key);
}
