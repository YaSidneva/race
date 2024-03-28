import { manageCar } from "../createAddPart/createAddCar";
import { createButton } from "../createButtons/createBtn";
import { createBtnContainer } from "../createAddPart/createBtnPart";
import { createRace } from "../createRacePart/createRace";
import { createPageManagmentContainer } from "../createPageManagment/createPageManagment"
import GarageApi from "../../api/garageApi";
import Garage from "../garage/garage";
import "../../components/global.css";


class App {
    private garageApi: GarageApi;
    private garage: Garage;

    constructor() {
        this.garageApi = new GarageApi(process.env.API_URL!, {});
        this.garage = new Garage();
    }

    start() {
        const body = document.querySelector("body") as HTMLElement;
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container');
        body.appendChild(mainContainer);
        const editSaveContainer = document.createElement('div');
        editSaveContainer.classList.add('update-container');
        mainContainer.appendChild(editSaveContainer);
        const headerBtn = document.createElement('div');
        headerBtn.classList.add('header-btn-block');
        editSaveContainer.appendChild(headerBtn);
        const btnElGarage = createButton('To garage');
        const btnElWinner = createButton('To winners');
        const toGarageButton = headerBtn.appendChild(btnElGarage);
        const toWinnerButton = headerBtn.appendChild(btnElWinner);
        const addCarBlock = document.createElement('div');
        addCarBlock.classList.add('car-container');
        editSaveContainer.appendChild(addCarBlock);
        const raceContainer = document.createElement('div');
        raceContainer.classList.add('race-container');
        let page = 0;
        let limit = 7;
        const addCar = addCarBlock.appendChild(manageCar('Create car', newCar => {
            console.log(newCar);
            this.garageApi.createCar(newCar,
                c => {
                    console.log(c);
                    this.garage.renderGarage(page, limit, raceContainer);
                })
        }));
        const updCar = addCarBlock.appendChild(manageCar('Update car', e => {
        }));
        updCar.classList.add('upd-container');
        const btnBlock = editSaveContainer.appendChild(createBtnContainer());

        mainContainer.appendChild(raceContainer);
        this.garage.renderGarage(page, limit, raceContainer);

        mainContainer.appendChild(createPageManagmentContainer());
    }
}

export default App;
