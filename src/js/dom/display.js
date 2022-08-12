const Display = {
  element: document.getElementById('display'),
  textDefault: '0',
  isForClearing: false,

  get text() {
    const currentText = this.element.textContent;

    if (Number.parseInt(currentText) === NaN || this.isForClearing) {
      this.isForClearing = false;
      return this.textDefault;
    }

    return currentText;
  },

  set text(candidateValue) {
    candidateValue = candidateValue.replace(/,/g, ''); // Strip comma separators
    const original = candidateValue;
    candidateValue = Number.parseFloat(candidateValue); // Convert to actual number

    if (candidateValue > Number.MAX_SAFE_INTEGER) {
      console.warn(
        `Attempting to set number (${original}) greater than safest (${Number.MAX_SAFE_INTEGER})`
      );
      return; // Disallow numbers greater than the safe integer
    }

    candidateValue = candidateValue.toLocaleString(); // i.e. add comma separators
    this.element.textContent = candidateValue; // Show on DOM
  },

  get textNumeric() {
    return Number.parseInt(this.text.replace(/,/g, ''));
  },

  delete() {
    this.text = this.text.slice(0, -1) || this.textDefault;
  },

  reset() {
    this.text = this.textDefault;
    this.isForClearing = false;
  },
};

Display.reset();
Display.element.addEventListener('click', Display.delete.bind(Display));

export default Display;
