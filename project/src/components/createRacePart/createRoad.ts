import './style.css';
import { createCar } from './createCar';
import { createStartStopBtn } from './createStartStopBtn';
import { Car } from '../../types';

export function createRoad(carColor: string, car: Car): HTMLElement {
  const roadPart = document.createElement('div');
  roadPart.classList.add('road-part');
  const carElement = createCar(car.color);
  roadPart.appendChild(createStartStopBtn(car.id, roadPart, carElement));
  roadPart.appendChild(carElement).classList.add('car');
  const flagImg = document.createElement('div');
  flagImg.classList.add('flag');
  roadPart.appendChild(flagImg);

  return roadPart;
}
