import './style.css';
import { createCar } from './createCar';
import { Car } from '../../types';
import { createButton } from '../createButtons/createBtn';
import EngineApi from '../../api/engineApi';

class CarElement {
  public car: Car;

  private engineApi: EngineApi;

  private carElement: HTMLElement;

  private intervalDrive: NodeJS.Timeout;

  private startBtn: HTMLButtonElement;

  private stopBtn: HTMLButtonElement;

  private roadPart: HTMLDivElement;

  constructor(car: Car) {
    this.car = car;
    this.engineApi = new EngineApi(process.env.API_URL!, {});
    this.roadPart = document.createElement('div');
    this.roadPart.classList.add('road-part');
    this.carElement = createCar(this.car.color);
    this.roadPart.appendChild(this.createStartStopBtn());
    this.roadPart.appendChild(this.carElement).classList.add('car');
    const flagImg = document.createElement('div');
    flagImg.classList.add('flag');
    this.roadPart.appendChild(flagImg);
  }

  createRoad(): HTMLElement {
    return this.roadPart;
  }

  createStartStopBtn(): HTMLElement {
    const startStop = document.createElement('div');
    startStop.classList.add('start-stop-block');
    this.startBtn = createButton('A', this.startDriving.bind(this));
    this.startBtn.classList.add('drive-button-start');
    this.stopBtn = createButton('B', this.stopDriving.bind(this));
    this.stopBtn.disabled = true;
    this.stopBtn.classList.add('drive-button-stop');

    startStop.appendChild(this.startBtn).classList.add('drive-btn');
    startStop.appendChild(this.stopBtn).classList.add('drive-btn');
    return startStop;
  }

  stopDriving() {
    this.stopBtn.disabled = true;
    const carId = this.car.id;
    if (this.intervalDrive) {
      clearInterval(this.intervalDrive);
    }
    this.carElement.style.left = '8px';
    this.startBtn.disabled = false;

    this.engineApi.changeEngineStatus({
      id: carId,
      status: 'stopped',
    }, () => {

    });
  }

  startDriving(): Promise<number> {
    const carId = this.car.id;
    const { carElement } = this;
    const widthRoad = this.roadPart.clientWidth - 55 - 50;

    return new Promise((resolve) => {
      this.engineApi.changeEngineStatus({
        id: this.car.id,
        status: 'started',
      }, (engineResponse) => {
        this.startBtn.disabled = true;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        this.stopBtn.disabled = false;

        let position = 8;
        const speed = engineResponse.velocity / 50;
        const interval = 5;

        function move() {
          if (position > widthRoad) {
            clearInterval(this.intervalDrive);
            resolve(engineResponse.distance / engineResponse.velocity);
          } else {
            position += speed;
            carElement.style.left = `${Math.floor(position)}px`;
          }
        }

        this.intervalDrive = setInterval(move, interval);
        this.engineApi.changeCarEngine({
          status: 'drive',
          id: carId,
        }, (stopIfError500) => {
          if (stopIfError500.status === 500) {
            clearInterval(this.intervalDrive);
            resolve(Infinity);
          }
        });
      });
    });
  }
}

export default CarElement;
