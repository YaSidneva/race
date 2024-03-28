import GarageApi from "../../api/garageApi";
import { Car } from "../../types";
import { createRace } from "../createRacePart/createRace";

class Garage {
    private garageApi: GarageApi;

    constructor() {
        this.garageApi = new GarageApi(process.env.API_URL!, {});
    }

    renderGarage(page: number, limit: number, raceContainer: HTMLElement) {
        raceContainer.innerHTML = '';
        this.garageApi.getCars(page, limit, c => {
            console.log(c);
            const race = raceContainer.appendChild(createRace(c as Array<Car>));
        });
    }
}

export default Garage;
