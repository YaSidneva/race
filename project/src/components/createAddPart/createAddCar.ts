import { createButton } from "../createButtons/createBtn";
import "./style.css"

export function createAddCar(btnText: string): HTMLElement {
    const createField = document.createElement('div');
    createField.classList.add('car-block');
    const textField = document.createElement('input');
    textField.type = 'text';
    textField.classList.add('textfield');
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#6CB4EE';
    const btnCreate = createButton(btnText);
    createField.appendChild(textField);
    createField.appendChild(colorPicker);
    createField.appendChild(btnCreate);
    return createField;
}