import { createButton } from '../createButtons/createBtn';
import { Car, ICallback } from '../../types';
import './style.css';

export function manageCar(btnText: string, btnAction: ICallback<Car>): HTMLElement {
  const createField = document.createElement('div');
  createField.classList.add('car-block');
  const textField = document.createElement('input');
  textField.type = 'text';
  textField.classList.add('textfield');
  const colorPicker = document.createElement('input');
  colorPicker.classList.add('color-picker');
  colorPicker.type = 'color';
  colorPicker.value = '#6CB4EE';
  const btnCreate = createButton(btnText, () => {
    const newCar: Car = {
      name: textField.value,
      color: colorPicker.value,
    };
    btnAction(newCar);
    textField.value = '';
    colorPicker.value = '#6CB4EE';
  });
  createField.appendChild(textField);
  createField.appendChild(colorPicker);
  createField.appendChild(btnCreate);
  return createField;
}
