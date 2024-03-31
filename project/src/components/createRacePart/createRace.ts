import { createRaceItem } from './createRaceItem';
import { Car, ICallback, PageResponse } from '../../types';

export function createRace(
  cars: PageResponse<Car>,
  onRemove: ICallback<number>,
  onSelect: ICallback<Car>,
): HTMLElement {
  const racePart = document.createElement('div');
  cars.rows.forEach((car) => {
    racePart.appendChild(createRaceItem(car, onRemove, onSelect));
  });
  racePart.classList.add('race');
  return racePart;
}
