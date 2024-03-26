import "./style.css";
import { createCar } from "../createRacePart/createCar";
export function createRoad(): HTMLElement {
    const roadPart = document.createElement('div');
    roadPart.classList.add('road-part');
    roadPart.appendChild(createCar('#00d2ff'));
    const flagImg = document.createElement('div');
    flagImg.classList.add('flag');
    roadPart.appendChild(flagImg);

    return roadPart;
}