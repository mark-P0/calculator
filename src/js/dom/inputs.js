import InputDefinitions from './input-definitions.js';

const Inputs = document.getElementById('inputs');

/*  Computed button width from container size
    `clientWidth` is decremented because it is often rounded up,
    leading to non-exact derived widths.
 */
const ROW_BUTTON_CT = 4;
const inputWidth = (Inputs.clientWidth - 1) / ROW_BUTTON_CT;

initializeInputButtons();
customize0Button();

/****************************************************************
 ****************************************************************
 ****************************************************************
 ****************************************************************/

function initializeInputButtons() {
  for (const def of InputDefinitions) {
    const { text, classes } = def;

    /* Button element */
    const inputButton = document.createElement('button');
    inputButton.textContent = text;
    for (const cls of classes) {
      inputButton.classList.toggle(cls);
    }

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
  /*  Double the width of the `0` container,
      which the actual `0` button will fill
   */
  const inputButton0Container = Inputs.children[Inputs.children.length - 3];
  inputButton0Container.style.width = inputWidth * 2 + 'px';

  /*  Nest a "button" within the actual `0` button
      so that it will align with the left buttons.
      There should be a better way to do this...
   */
  const inputButton0 = inputButton0Container.children[0];
  const fakeButton = document.createElement('div');

  fakeButton.classList.toggle('input-button');
  fakeButton.classList.toggle('input-button-fake');
  inputButton0.classList.toggle('input-button-container-fake');

  fakeButton.textContent = inputButton0.textContent;
  inputButton0.textContent = undefined;

  inputButton0.appendChild(fakeButton);
}
