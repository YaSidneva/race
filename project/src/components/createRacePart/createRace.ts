import { createRoad } from "./createRoad";

export function createRace(): HTMLElement {
    const racePart = document.createElement('div');
    const hearedRace = document.createElement('div');
    hearedRace.textContent = `Garage ()`;
    racePart.appendChild(hearedRace);
    const page = document.createElement('div');
    page.textContent = `page `;
    racePart.appendChild(page);
    const road = racePart.appendChild(createRoad());
    return racePart;
}