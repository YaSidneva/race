import { manageCar } from "../createAddPart/createAddCar";
import { createButton } from "../createButtons/createBtn";
import { createBtnContainer } from "../createAddPart/createBtnPart";
import { createRace } from "../createRacePart/createRace";
import { createPageManagmentContainer } from "../createPageManagment/createPageManagment"
import GarageApi from "../../api/garageApi";
import "../../components/global.css";


class App {
    private garageApi: GarageApi;

    constructor() {
        this.garageApi = new GarageApi(process.env.API_URL!, {});
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
        const addCar = addCarBlock.appendChild(manageCar('Create car', newCar => {
            console.log(newCar);
            this.garageApi.createCar(newCar,
                c => {
                    console.log(c);
                    raceContainer.innerHTML = '';
                    this.garageApi.getCars(0, 7, c => {
                        console.log(c);
                        const race = raceContainer.appendChild(createRace(c));
                    });
                })
        }));
        const updCar = addCarBlock.appendChild(manageCar('Update car', e => {
        }));
        updCar.classList.add('upd-container');
        const btnBlock = editSaveContainer.appendChild(createBtnContainer());

        mainContainer.appendChild(raceContainer);
        this.garageApi.getCars(0, 7, c => {
            console.log(c);
            const race = raceContainer.appendChild(createRace(c));
        });

        mainContainer.appendChild(createPageManagmentContainer());
    }
}

export default App;
