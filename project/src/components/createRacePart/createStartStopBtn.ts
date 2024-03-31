/* eslint-disable no-param-reassign */
import { createButton } from '../createButtons/createBtn';
import EngineApi from '../../api/engineApi';

export function createStartStopBtn(carId: number, roadPart: HTMLElement, car: HTMLElement)
  : HTMLElement {
  const startStop = document.createElement('div');
  startStop.classList.add('start-stop-block');
  const engineApi = new EngineApi(process.env.API_URL!, {});
  let intervalDrive: NodeJS.Timeout;
  const startBtn = createButton('A', () => {
    const widthRoad = roadPart.clientWidth - 55 - 50;
    engineApi.changeEngineStatus({
      id: carId,
      status: 'started',
    }, (engineResponse) => {
      startBtn.disabled = true;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      stopBtn.disabled = false;

      let position = 8;
      const speed = engineResponse.velocity / 100;
      const interval = 5;

      function move() {
        if (position > widthRoad) {
          clearInterval(intervalDrive);
        } else {
          position += speed;
          car.style.left = `${Math.floor(position)}px`;
        }
      }

      intervalDrive = setInterval(move, interval);
      engineApi.changeCarEngine({
        status: 'drive',
        id: carId,
      }, (stopIfError500) => {
        if (stopIfError500.status === 500) {
          clearInterval(intervalDrive);
        }
      });
    });
  });
  startBtn.classList.add('drive-button-start');
  const stopBtn = createButton('B', () => {
    stopBtn.disabled = true;
    if (intervalDrive) {
      clearInterval(intervalDrive);
    }
    car.style.left = '8px';
    startBtn.disabled = false;

    engineApi.changeEngineStatus({
      id: carId,
      status: 'stopped',
    }, () => {

    });
  });
  stopBtn.disabled = true;
  stopBtn.classList.add('drive-button-stop');

  startStop.appendChild(startBtn).classList.add('drive-btn');
  startStop.appendChild(stopBtn).classList.add('drive-btn');
  return startStop;
}
