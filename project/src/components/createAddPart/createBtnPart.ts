import { createButton } from '../createButtons/createBtn';
import { carNames } from '../../const/carNames';
import GarageApi from '../../api/garageApi';
import PageManagment from '../createPageManagment/createPageManagment';

export function createBtnContainer(pagemanagment: PageManagment): HTMLElement {
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-block');
  const racebtn = createButton('race', () => {
    (document.querySelectorAll('.drive-button-start')).forEach(
      (startButton) => (startButton as HTMLButtonElement).click(),
    );
  });
  const resetbtn = createButton('reset', () => {
    (document.querySelectorAll('.drive-button-stop')).forEach(
      (startButton) => (startButton as HTMLButtonElement).click(),
    );
  });
  const garageApi = new GarageApi(process.env.API_URL!, {});
  const generate = createButton('generate cars', () => {
    for (let i = 1; i <= 100; i += 1) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const randomColor = `rgb(${r},${g},${b})`;
      const randomName = carNames[Math.floor(Math.random() * carNames.length)];
      garageApi.createCar({
        color: randomColor,
        name: randomName,
      }, () => {
      });
    }
    pagemanagment.renderPageContainer();
  });
  btnContainer.appendChild(racebtn);
  btnContainer.appendChild(resetbtn);
  btnContainer.appendChild(generate);
  return btnContainer;
}
