import { createRaceItem } from './createRaceItem';
import { Car, ICallback, PageResponse } from '../../types';
import CarElement from './createRoad';

export function createRace(
  cars: PageResponse<Car>,
  onRemove: ICallback<number>,
  onSelect: ICallback<Car>,
): [HTMLElement, Array<CarElement>] {
  const racePart = document.createElement('div');
  const carElements: Array<CarElement> = [];
  cars.rows.forEach((car) => {
    const [raceItem, carElement] = createRaceItem(car, onRemove, onSelect);
    racePart.appendChild(raceItem);
    carElements.push(carElement);
  });
  racePart.classList.add('race');
  return [racePart, carElements];
}
