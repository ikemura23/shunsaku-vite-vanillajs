import './style.css'

let counter = 0

function setupCounter(element) {
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

document.querySelector('#counter') && setupCounter(document.querySelector('#counter'))

console.log('Hello from Vite + Vanilla JS!')