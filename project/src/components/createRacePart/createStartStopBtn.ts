import { createButton } from "../createButtons/createBtn";
import EngineApi from "../../api/engineApi";

export function createStartStopBtn(carId: number, roadPart: HTMLElement, car: HTMLElement): HTMLElement {
    const startStop = document.createElement('div');
    startStop.classList.add('start-stop-block');
    const engineApi = new EngineApi(process.env.API_URL!, {});
    let intervalDrive: NodeJS.Timeout;
    const startBtn = createButton('A', e => {
        const widthRoad = roadPart.clientWidth - 55 - 50;
        console.log(widthRoad);
        engineApi.changeEngineStatus({
            id: carId,
            status: 'started'
        }, engineResponse => {

            startBtn.disabled = true;
            stopBtn.disabled = false;

            let position = 8;
            let speed = engineResponse.velocity / 100;
            let interval = 5; // Интервал в миллисекундах

            function move() {
                if (position > widthRoad) {
                    clearInterval(intervalDrive);
                } else {
                    position = position + speed
                    car.style.left = Math.floor(position) + "px"; // Изменяем позицию элемента
                }
            }

            // Запускаем движение с использованием таймера
            intervalDrive = setInterval(move, interval);
            engineApi.changeCarEngine({
                status: 'drive',
                id: carId
            }, stopIfError500 => {
                console.log(stopIfError500);
                if (stopIfError500.status === 500) {
                    clearInterval(intervalDrive);
                }
            })
        });
    });
    startBtn.classList.add('drive-button-start')
    const stopBtn = createButton('B', e => {

        stopBtn.disabled = true;
        if (intervalDrive) {
            clearInterval(intervalDrive);
        }
        car.style.left = `8px`;
        startBtn.disabled = false;

        engineApi.changeEngineStatus({
            id: carId,
            status: 'stopped'
        }, engineResponse => {

        });
    });
    stopBtn.disabled = true;
    stopBtn.classList.add('drive-button-stop')


    startStop.appendChild(startBtn).classList.add('drive-btn');
    startStop.appendChild(stopBtn).classList.add('drive-btn');
    return startStop;
}