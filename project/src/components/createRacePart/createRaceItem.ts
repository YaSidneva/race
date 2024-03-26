import { createButton } from "../createButtons/createBtn";
import { createRoad } from "../createRacePart/createRoad";
import "./style.css";

export function createRaceItem(): HTMLElement {
    const newItem = document.createElement('div');
    newItem.classList.add('item-car');
    const carHeaderBtn = document.createElement('div');
    newItem.appendChild(carHeaderBtn);
    carHeaderBtn.classList.add('car-header');
    carHeaderBtn.appendChild(createButton('select')).classList.add('car-header-btn');
    carHeaderBtn.appendChild(createButton('remove')).classList.add('car-header-btn');
    const titleCar = document.createElement('div');
    titleCar.textContent = 'name';
    carHeaderBtn.appendChild(titleCar);
    const road = newItem.appendChild(createRoad());
    return newItem;
}