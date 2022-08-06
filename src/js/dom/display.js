const Display = {
  element: document.getElementById('display'),

  textDefault: '0',

  get text() {
    const currentText = this.element.textContent;

    if (currentText.match(/((?![\d,]).)/g) !== null) {
      return this.textDefault;
    }

    return currentText;
  },

  set text(candidateValue) {
    candidateValue = candidateValue.replace(/,/g, ''); // Strip comma separators
    const original = candidateValue;
    candidateValue = Number.parseInt(candidateValue); // Convert to actual number

    if (candidateValue > Number.MAX_SAFE_INTEGER) {
      console.warn(
        `Attempting to set number (${original}) greater than safest (${Number.MAX_SAFE_INTEGER})`
      );
      return; // Disallow numbers greater than the safe integer
    }

    candidateValue = candidateValue.toLocaleString(); // i.e. add comma separators
    this.element.textContent = candidateValue; // Show on DOM
  },
};

Display.text = Display.textDefault;

export default Display;
