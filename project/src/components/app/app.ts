import { manageCar } from "../createAddPart/createAddCar";
import { createButton } from "../createButtons/createBtn";
import { createBtnContainer } from "../createAddPart/createBtnPart";
import GarageApi from "../../api/garageApi";
import PageManagment from "../createPageManagment/createPageManagment";
import { winners } from "../winners/winners"
import "../../components/global.css";


class App {
    private garageApi: GarageApi;
    private pageManager: PageManagment;

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
        const pageManagmentContainer = document.createElement('div');
        this.pageManager = new PageManagment(pageManagmentContainer);
        const addCarBlock = document.createElement('div');
        addCarBlock.classList.add('car-container');
        editSaveContainer.appendChild(addCarBlock);
        let page = 0;
        let limit = 7;
        const addCar = addCarBlock.appendChild(manageCar('Create car', newCar => {
            console.log(newCar);
            this.garageApi.createCar(newCar,
                c => {
                    console.log(c);
                    this.pageManager.renderPageContainer();
                })
        }));
        const updCar = addCarBlock.appendChild(manageCar('Update car', e => {
        }));
        updCar.classList.add('upd-container');
        const btnBlock = editSaveContainer.appendChild(createBtnContainer());

        mainContainer.appendChild(pageManagmentContainer);
        this.pageManager.renderPageContainer();
        mainContainer.appendChild(winners());
    }
}

export default App;
