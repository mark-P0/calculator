/* prettier-ignore */
const BUTTON_TEXTS = [
  'AC', '±', '%', '÷',
   '7', '8', '9', '×',
   '4', '5', '6', '−',
   '1', '2', '3', '+',
      '0',   '.', '=',
      // '',
]

/*  Approximation of the "fractional" plus-minus character
    https://stackoverflow.com/questions/18094826/is-there-a-unicode-character-for-plus-over-minus
 */
// BUTTON_TEXTS[1] = '\u{207A}\u{2215}\u{208B}';

const Inputs = document.getElementById('inputs');

/*  Computed button width from container size
    `clientWidth` is decremented because it is often rounded up,
    leading to non-exact derived widths.
 */
const inputWidth = (Inputs.clientWidth - 1) / 4;

initializeInputButtons();
customize0Button();

/* Add colors*/
customizeTopButtons();
customizeOperatorButtons();

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/

function initializeInputButtons() {
  for (const text of BUTTON_TEXTS) {
    /* Button element */
    const inputButton = document.createElement('button');
    inputButton.classList.toggle('input-button');
    inputButton.textContent = text;

    /*  Button container
        Used for more precise control over input spacings
     */
    const containerDiv = document.createElement('div');
    containerDiv.classList.toggle('input-button-container');

    /* Button container dimensions */
    containerDiv.style.width = inputWidth + 'px';
    containerDiv.style.height = inputWidth + 'px';

    /* Add to DOM */
    containerDiv.appendChild(inputButton);
    Inputs.appendChild(containerDiv);
  }
}

function customize0Button() {
  /* Double the width of the `0` container */
  const inputButton0Container = Inputs.children[Inputs.children.length - 3];
  inputButton0Container.style.width = inputWidth * 2 + 'px';

  /* FIXME: Documentation!  */
  const inputButton0 = inputButton0Container.children[0];
  const fakeButton = document.createElement('div');

  fakeButton.classList.toggle('input-button');

  fakeButton.textContent = inputButton0.textContent;
  fakeButton.style.border = 'none';
  fakeButton.style.width = '50%';
  fakeButton.style.paddingRight = '0.25rem';
  inputButton0.style.padding = 0;
  inputButton0.style.justifyContent = 'left';
  inputButton0.textContent = undefined;

  inputButton0.appendChild(fakeButton);
}

function customizeTopButtons() {
  const TOP_ROW_BUTTON_CT = 3;

  for (let idx = 0; idx < TOP_ROW_BUTTON_CT; idx++) {
    Inputs.children[idx].children[0].classList.toggle('input-button-top');
  }
}

function customizeOperatorButtons() {
  const OPERATOR_BUTTON_CT = 4;

  for (let idx = 0; idx < OPERATOR_BUTTON_CT; idx++) {
    const operatorIdx = (idx + 1) * 4 - 1;
    Inputs.children[operatorIdx].children[0].classList.toggle(
      'input-button-operator'
    );
  }

  /*  One more for the last button `=` operator
      Loop cannot account for this it would expect a total button count of 20,
      whereas the actual button count is only 19 (`0` button spans wide)
   */
  Inputs.children[Inputs.children.length - 1].children[0].classList.toggle(
    'input-button-operator'
  );
}
