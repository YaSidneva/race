import { createButton } from "../createButtons/createBtn";
import EngineApi from "../../api/engineApi";

export function createStartStopBtn(carId: number): HTMLElement {
    const startStop = document.createElement('div');
    startStop.classList.add('start-stop-block');
    const engineApi = new EngineApi(process.env.API_URL!, {});

    const startBtn = createButton('A', e => {
        engineApi.changeEngineStatus({
            id: carId,
            status: 'started'
        }, engineResponse => { });
    });
    const stopBtn = createButton('B', e => {
        engineApi.changeEngineStatus({
            id: carId,
            status: 'stopped'
        }, engineResponse => { });
    });
    startStop.appendChild(startBtn).classList.add('drive-btn');
    startStop.appendChild(stopBtn).classList.add('drive-btn');
    return startStop;
}