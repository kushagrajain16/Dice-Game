const button = document.querySelector('#dispatch-roll');
const container = document.querySelector('.container');
const dice = document.querySelector('.dice');

const rollMax = 5;



const tossBtn = document.getElementById("tossBtn");
const result = document.getElementById("result");

tossBtn.addEventListener("click", () => {
  const coinValue = Math.floor(Math.random() * 2) === 0 ? "Heads" : "Tails";
  result.textContent = `You got ${coinValue}!`;
});



let angleX = 0;
let angleY = 0;
let result = 1;
let delay = 0;
let allowRolling = true;

const getRandomInteger = (max) => {
  return Math.floor(Math.random() * max);
};

const roll = () => {
  allowRolling = false;
  container.style.transform = 'scale(1.5)';
  button.style.transform = 'scale(0.5)';
  button.style.opacity = 0;

  const xTurn = 4 + getRandomInteger(rollMax);
  const yTurn = 4 + getRandomInteger(rollMax);

  delay = Math.max(xTurn, yTurn) * 250;

  angleX += 90 * xTurn;
  angleY += 90 * yTurn;

  if (angleX % 180) {
    getRandomInteger(3) > 1 && (angleX += 90);
  }

  dice.style.transform =
    'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg)';
  dice.style.transitionDuration = delay + 'ms';

  let x = angleX % 360;
  let y = angleY % 360;

  if (x === 0 || x === 180) {
    switch ((x + y) % 360) {
      case 0:
        result = 1;
        break;
      case 90:
        result = 5;
        break;
      case 180:
        result = 6;
        break;
      case 270:
        result = 2;
        break;
      default:
        // Noop
    }
  } else if (x === 90) {
    result = 4;
  } else if (x === 270) {
    result = 3;
  }

  setTimeout(() => {
    allowRolling = true;
    container.style.transform = 'scale(1)';
    button.style.transform = 'scale(1)';
    button.style.opacity = 1;
  }, delay);

  return result;
};

button.addEventListener('click', () => allowRolling && roll());
container.addEventListener('click', () => allowRolling && roll());
