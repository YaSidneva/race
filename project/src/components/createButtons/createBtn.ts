import './style.css';
export function createButton(text: string): HTMLElement {
    const newButton = document.createElement('button');
    newButton.textContent = text;
    newButton.classList.add('button');
    return newButton;
}