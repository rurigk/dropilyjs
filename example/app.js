import Dropily from '../src/dropily';
let dropdown;

function generateSelect() {
  let select = document.createElement('select');
  let options = 0;

  while (options < 10) {
    let option = document.createElement('option');
    options++;
    option.value = options;
    option.text = `Option ${options}`;
    select.appendChild(option);
  }

  select.classList.add('dropdown');
  document.body.appendChild(select);
  startDropily('.dropdown')
}

function startDropily(selector) {
  dropdown = new Dropily(selector);
  // You can call the instance in the browser
  window.$dropily = dropdown;
}

window.onload = generateSelect;
