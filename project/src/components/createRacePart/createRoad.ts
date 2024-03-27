import "./style.css";
import { createCar } from "../createRacePart/createCar";
import { createStartStopBtn } from "../createRacePart/createStartStopBtn";

export function createRoad(carColor: string): HTMLElement {
    const roadPart = document.createElement('div');
    roadPart.classList.add('road-part');
    roadPart.appendChild(createStartStopBtn());
    roadPart.appendChild(createCar(carColor)).classList.add('car');
    const flagImg = document.createElement('div');
    flagImg.classList.add('flag');
    roadPart.appendChild(flagImg);

    return roadPart;
}