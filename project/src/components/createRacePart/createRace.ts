import { createRoad } from "./createRoad";
import { createButton } from "../createButtons/createBtn";
import { createRaceItem } from "../createRacePart/createRaceItem";

export function createRace(): HTMLElement {
    const racePart = document.createElement('div');
    const hearedRace = document.createElement('div');
    hearedRace.textContent = `Garage ()`;
    racePart.appendChild(hearedRace);
    const page = document.createElement('div');
    page.textContent = `page `;
    racePart.appendChild(page);
    racePart.appendChild(createRaceItem());
    return racePart;
}