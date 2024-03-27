import { Car } from "../../types";
import { createButton } from "../createButtons/createBtn";
import { createRoad } from "../createRacePart/createRoad";
import "./style.css";

export function createRaceItem(car: Car): HTMLElement {
    const newItem = document.createElement('div');
    newItem.classList.add('item-car');
    const carHeaderBtn = document.createElement('div');
    newItem.appendChild(carHeaderBtn);
    carHeaderBtn.classList.add('car-header');
    carHeaderBtn.appendChild(createButton('select', e => {
        const updTextfield = document.querySelector('.upd-container').querySelector('.textfield') as HTMLInputElement;
        updTextfield.value = car.name;
        const updColorPicker = document.querySelector('.upd-container').querySelector('.color-picker') as HTMLInputElement;
        updColorPicker.value = car.color;
    })).classList.add('car-header-btn');
    carHeaderBtn.appendChild(createButton('remove')).classList.add('car-header-btn');
    const titleCar = document.createElement('div');
    titleCar.textContent = car.name;
    carHeaderBtn.appendChild(titleCar);
    const road = newItem.appendChild(createRoad(car.color));
    return newItem;
}