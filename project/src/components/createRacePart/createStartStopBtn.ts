import { createButton } from "../createButtons/createBtn";

export function createStartStopBtn(): HTMLElement {
    const startStop = document.createElement('div');
    startStop.classList.add('start-stop-block');
    const startBtn = createButton('A');
    const stopBtn = createButton('B');
    startStop.appendChild(startBtn).classList.add('drive-btn');
    startStop.appendChild(stopBtn).classList.add('drive-btn');
    return startStop;
}