import { createButton } from "../createButtons/createBtn";
import EngineApi from "../../api/engineApi";

export function createStartStopBtn(carId: number, roadPart: HTMLElement, car: HTMLElement): HTMLElement {
    const startStop = document.createElement('div');
    startStop.classList.add('start-stop-block');
    const engineApi = new EngineApi(process.env.API_URL!, {});
    const startBtn = createButton('A', e => {
        const widthRoad = roadPart.clientWidth - 55 - 50;
        console.log(widthRoad);
        engineApi.changeEngineStatus({
            id: carId,
            status: 'started'
        }, engineResponse => {
            engineApi.changeCarEngine({
                status: 'drive',
                id: carId
            }, stopIfError500 => {
                console.log(stopIfError500);
            })
            car.style.left = `${widthRoad}px`;
        });
    });
    const stopBtn = createButton('B', e => {
        engineApi.changeEngineStatus({
            id: carId,
            status: 'stopped'
        }, engineResponse => {
            car.style.left = `8px`;
        });
    });
    startStop.appendChild(startBtn).classList.add('drive-btn');
    startStop.appendChild(stopBtn).classList.add('drive-btn');
    return startStop;
}