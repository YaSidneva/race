import { createButton } from "../createButtons/createBtn";
import WinnersApi from "../../api/winnersApi";
import GarageApi from "../../api/garageApi";
import { createCar } from "../createRacePart/createCar";
import "./style.css";

export function winners(): HTMLElement {
    const winnersBlock = document.createElement('div');
    const headerWinners = document.createElement('div');
    winnersBlock.appendChild(headerWinners);
    headerWinners.innerText = `Winners ()`;

    const mainWinners = document.createElement('table')
    mainWinners.classList.add('winners-table');
    const trWinners = document.createElement('tr');
    mainWinners.appendChild(trWinners);
    function createHeaderElement(columnName: string): HTMLTableCellElement {
        const headerEl = document.createElement('th')
        headerEl.innerText = columnName
        return headerEl
    }
    const thNumber = createHeaderElement('Number');
    const thCar = createHeaderElement('Car');
    const thName = createHeaderElement('Name');
    const thWins = createHeaderElement('Wins');
    const thTime = createHeaderElement('Best time (seconds)');
    const thArr = [thNumber, thCar, thName, thWins, thTime];
    function addElementToTh(el: HTMLTableCellElement) {
        trWinners.appendChild(el);
    }
    thArr.forEach(addElementToTh);

    function createCellElement(cellData: string | number | undefined | HTMLElement): HTMLTableCellElement {
        const headerEl = document.createElement('td')
        headerEl.innerText = '' + cellData
        return headerEl
    }
    winnersBlock.appendChild(mainWinners);

    const footerWinners = document.createElement('div');
    winnersBlock.appendChild(footerWinners);
    footerWinners.appendChild(createButton('prev'));
    footerWinners.appendChild(createButton('next'));

    const newWinnersApi = new WinnersApi(process.env.API_URL!, {});
    const garageApi = new GarageApi(process.env.API_URL!, {});

    newWinnersApi.getWinners({
        page: 1,
        limit: 10,
        sort: "wins",
        order: "ASC"
    }, wins => {
        wins.forEach((v, i) => {
            const trWinnerItem = document.createElement('tr');
            mainWinners.appendChild(trWinnerItem);
            garageApi.getCar(v.id, car => {


                const tdNumberItem = createCellElement(i + 1);
                const tdCarItem = document.createElement('td');
                tdCarItem.appendChild(createCar(car.color));
                const tdNameItem = createCellElement(car.name);
                const tdWinsItem = createCellElement(v.wins);
                const tdTimeItem = createCellElement(v.time);
                const tdItemArr = [tdNumberItem, tdCarItem, tdNameItem, tdWinsItem, tdTimeItem];
                function addItemElementToTd(el: HTMLTableCellElement) {
                    trWinnerItem.appendChild(el);
                }
                tdItemArr.forEach(addItemElementToTd);
            })

        })
    })


    return winnersBlock;
}