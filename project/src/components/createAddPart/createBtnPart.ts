import { createButton } from "../createButtons/createBtn";

export function createBtnContainer(): HTMLElement {
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-block');
    const racebtn = createButton('race');
    const resetbtn = createButton('reset');
    const generate = createButton('generate cars');
    btnContainer.appendChild(racebtn);
    btnContainer.appendChild(resetbtn);
    btnContainer.appendChild(generate);
    return btnContainer;
}