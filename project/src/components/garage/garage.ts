import GarageApi from "../../api/garageApi";
import { Car } from "../../types";
import PageManagment from "../createPageManagment/createPageManagment";
import { createRace } from "../createRacePart/createRace";

class Garage {
    private garageApi: GarageApi;
    private page: PageManagment;

    constructor(page: PageManagment) {
        this.garageApi = new GarageApi(process.env.API_URL!, {});
        this.page = page;
    }

    renderGarage(page: number, limit: number, raceContainer: HTMLElement) {
        raceContainer.innerHTML = '';
        this.garageApi.getCars(page, limit, c => {
            console.log(c);
            const race = raceContainer.appendChild(createRace(c as Array<Car>, carId => {
                this.garageApi.removeCar(carId, c => { this.page.renderPageContainer() });
            }));
        });
    }
}

export default Garage;
