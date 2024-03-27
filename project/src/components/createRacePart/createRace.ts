import { createRoad } from "./createRoad";
import { createButton } from "../createButtons/createBtn";
import { createRaceItem } from "../createRacePart/createRaceItem";
import { Car } from "../../types";

export function createRace(cars: Array<Car>): HTMLElement {
    const racePart = document.createElement('div');
    const hearedRace = document.createElement('div');
    hearedRace.textContent = `Garage ()`;
    racePart.appendChild(hearedRace);
    const page = document.createElement('div');
    page.textContent = `page `;
    racePart.appendChild(page);
    cars.forEach(car => {
        racePart.appendChild(createRaceItem(car));
    });
    racePart.classList.add('race');
    return racePart;
}