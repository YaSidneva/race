import { createButton } from "../createButtons/createBtn";
import "./style.css";

export function createPageManagmentContainer(): HTMLElement {
    const pageManagmentContainer = document.createElement('div');
    pageManagmentContainer.classList.add('page-manager-container');
    pageManagmentContainer.appendChild(createButton('prev')).classList.add('page-btn');
    pageManagmentContainer.appendChild(createButton('next')).classList.add('page-btn');
    return pageManagmentContainer;
}