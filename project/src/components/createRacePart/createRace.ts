import { createRaceItem } from './createRaceItem';
import { Car, ICallback, PageResponse } from '../../types';

export function createRace(cars: PageResponse<Car>, onRemove: ICallback<number>): HTMLElement {
  const racePart = document.createElement('div');
  cars.rows.forEach((car) => {
    racePart.appendChild(createRaceItem(car, onRemove));
  });
  racePart.classList.add('race');
  return racePart;
}
