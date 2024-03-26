import { createAddCar } from "../createAddPart/createAddCar";
import { createButton } from "../createButtons/createBtn";
import { createBtnContainer } from "../createAddPart/createBtnPart";
import { createRace } from "../createRacePart/createRace";
import "../../components/global.css";

class App {

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
        const addCar = addCarBlock.appendChild(createAddCar('Create car'));
        const updCar = addCarBlock.appendChild(createAddCar('Update car'));
        const btnBlock = editSaveContainer.appendChild(createBtnContainer());
        const race = mainContainer.appendChild(createRace());
        race.classList.add('race');
    }
}

export default App;
