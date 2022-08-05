document.querySelector('body').appendChild(
  (() => {
    let _ = document.createElement('p');
    _.textContent = 'Hello from JS!';
    return _;
  })()
);
