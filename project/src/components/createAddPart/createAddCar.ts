import { createButton } from "../createButtons/createBtn";

export function createAddCar(btnText: string): HTMLElement {
    const createField = document.createElement('div');
    const textField = document.createElement('div');
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    const btnCreate = createButton(btnText);
    createField.appendChild(textField);
    createField.appendChild(colorPicker);
    createField.appendChild(btnCreate);
    return createField;
}