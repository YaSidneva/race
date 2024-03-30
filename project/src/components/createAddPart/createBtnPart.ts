import { createButton } from "../createButtons/createBtn";
import { carNames } from "../../const/carNames";
import GarageApi from "../../api/garageApi";

export function createBtnContainer(): HTMLElement {
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-block');
    const racebtn = createButton('race', e => {
        (document.querySelectorAll('.drive-button-start')).forEach(
            startButton => (startButton as HTMLButtonElement).click()
        )
    });
    const resetbtn = createButton('reset', e => {
        (document.querySelectorAll('.drive-button-stop')).forEach(
            startButton => (startButton as HTMLButtonElement).click()
        )
    });
    const garageApi = new GarageApi(process.env.API_URL!, {});
    const generate = createButton('generate cars', e => {
        for (let i = 1; i <= 100; i++) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let randomColor = 'rgb(' + r + ',' + g + ',' + b + ')'
            let randomName = carNames[Math.floor(Math.random() * carNames.length)];
            garageApi.createCar({
                color: randomColor,
                name: randomName
            }, render => {

            })
        }
    });
    btnContainer.appendChild(racebtn);
    btnContainer.appendChild(resetbtn);
    btnContainer.appendChild(generate);
    return btnContainer;
}