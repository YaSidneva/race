import { createRoad } from "./createRoad";
import { createButton } from "../createButtons/createBtn";
import { createRaceItem } from "../createRacePart/createRaceItem";
import { Car, ICallback } from "../../types";

export function createRace(cars: Array<Car>, onRemove: ICallback<number>): HTMLElement {
    const racePart = document.createElement('div');
    cars.forEach(car => {
        racePart.appendChild(createRaceItem(car, onRemove));
    });
    racePart.classList.add('race');
    return racePart;
}