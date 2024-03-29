import { createButton } from "../createButtons/createBtn";

export function winners() {
    const winnersBlock = document.createElement('div');
    const headerWinners = document.createElement('div');
    winnersBlock.appendChild(headerWinners);
    headerWinners.innerText = `Winners ()`;

    const mainWinners = document.createElement('table');
    const trWinners = document.createElement('tr');
    mainWinners.appendChild(trWinners);
    const thNumber = document.createElement('th');
    const thCar = document.createElement('th');
    const thName = document.createElement('th');
    const thWins = document.createElement('th');
    const thTime = document.createElement('th');
    const thArr = [thNumber, thCar, thName, thWins, thTime];
    function addElementToTh(el) {
        trWinners.appendChild(el);
    }
    thArr.forEach(addElementToTh);
    // trWinners.appendChild(thNumber);
    // trWinners.appendChild(thCar);
    // trWinners.appendChild(thName);
    // trWinners.appendChild(thWins);
    // trWinners.appendChild(thTime);

    const trWinnerItem = document.createElement('tr');
    mainWinners.appendChild(trWinnerItem);
    const tdNumberItem = document.createElement('th');
    const tdCarItem = document.createElement('th');
    const tdNameItem = document.createElement('th');
    const tdWinsItem = document.createElement('th');
    const tdTimeItem = document.createElement('th');
    const tdItemArr = [tdNumberItem, tdCarItem, tdNameItem, tdWinsItem, tdTimeItem];
    function addItemElementToTd(el) {
        trWinnerItem.appendChild(el);
    }
    tdItemArr.forEach(addItemElementToTd);
    // trWinnerItem.appendChild(tdNumberItem);
    // trWinnerItem.appendChild(tdCarItem);
    // trWinnerItem.appendChild(tdNameItem);
    // trWinnerItem.appendChild(tdWinsItem);
    // trWinnerItem.appendChild(tdTimeItem);

    winnersBlock.appendChild(mainWinners);

    const footerWinners = document.createElement('div');
    winnersBlock.appendChild(footerWinners);
    footerWinners.appendChild(createButton('prev'));
    footerWinners.appendChild(createButton('next'));


    return winnersBlock;
}