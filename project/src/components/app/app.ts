import { createAddCar } from "../createAddPart/createAddCar";
import { createButton } from "../createButtons/createBtn";
import { createBtnContainer } from "../createAddPart/createBtnPart"

class App {

    start() {
        const body = document.querySelector("body") as HTMLElement;
        const btnElGarage = createButton('To garage');
        const btnElWinner = createButton('To winners');
        const toGarageButton = body.appendChild(btnElGarage);
        const toWinnerButton = body.appendChild(btnElWinner);
        const addCar = body.appendChild(createAddCar('Create car'));
        const updCar = body.appendChild(createAddCar('Update car'));
        const btnBlock = body.appendChild(createBtnContainer());
    }
}

export default App;
