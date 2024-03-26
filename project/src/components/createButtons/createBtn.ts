export function createButton(text: string): HTMLElement {
    const newButton = document.createElement('button');
    newButton.textContent = text;
    return newButton;
}