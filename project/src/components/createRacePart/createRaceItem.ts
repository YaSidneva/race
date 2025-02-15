import { Car, ICallback } from '../../types';
import { createButton } from '../createButtons/createBtn';
import CarElement from './createRoad';
import './style.css';

export function createRaceItem(car: Car, onRemove: ICallback<number>, onSelect: ICallback<Car>)
  : [HTMLElement, CarElement] {
  const newItem = document.createElement('div');
  newItem.classList.add('item-car');
  const carHeaderBtn = document.createElement('div');
  newItem.appendChild(carHeaderBtn);
  carHeaderBtn.classList.add('car-header');
  const carHeaderBtnBlock = document.createElement('div');
  carHeaderBtnBlock.classList.add('car-header-btn-block');
  carHeaderBtn.appendChild(carHeaderBtnBlock);
  carHeaderBtnBlock.appendChild(createButton('select', () => {
    const updTextfield = document.querySelector('.update-car-block').querySelector('.textfield') as HTMLInputElement;
    updTextfield.value = car.name;
    const updColorPicker = document.querySelector('.update-car-block').querySelector('.color-picker') as HTMLInputElement;
    updColorPicker.value = car.color;
    const updUpdateBtn = document.querySelector('.update-car-block').querySelector('.button') as HTMLButtonElement;
    updUpdateBtn.onclick = () => {
      const updatedCar: Car = {
        id: car.id,
        name: updTextfield.value,
        color: updColorPicker.value,
      };
      onSelect(updatedCar);
    };
  })).classList.add('car-header-btn');
  carHeaderBtnBlock.appendChild(createButton('remove', () => {
    onRemove(car.id);
  })).classList.add('car-header-btn');

  const titleCar = document.createElement('div');
  titleCar.textContent = car.name;
  titleCar.classList.add('title-car');
  carHeaderBtn.appendChild(titleCar);
  const carElement = new CarElement(car);
  newItem.appendChild(carElement.createRoad());
  return [newItem, carElement];
}
