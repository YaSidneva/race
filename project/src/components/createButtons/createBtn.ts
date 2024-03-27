import { ICallback } from '../../types';
import './style.css';

// todo: remove ? from action
export function createButton(text: string, btnAction?: ICallback<MouseEvent>): HTMLElement {
    const newButton = document.createElement('button');
    newButton.textContent = text;
    newButton.classList.add('button');
    newButton.addEventListener('click', btnAction)
    return newButton;
}