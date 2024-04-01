import { createButton } from '../createButtons/createBtn';
import WinnersApi from '../../api/winnersApi';
import GarageApi from '../../api/garageApi';
import { createCar } from '../createRacePart/createCar';
import './style.css';

export function winners(): HTMLElement {
  const winnersBlock = document.createElement('div');
  winnersBlock.classList.add('winners-block');
  const headerWinners = document.createElement('div');
  headerWinners.classList.add('header-winners');
  winnersBlock.appendChild(headerWinners);

  const mainWinners = document.createElement('table');
  mainWinners.classList.add('winners-table');
  function createHeaderElement(columnName: string): HTMLTableCellElement {
    const headerEl = document.createElement('th');
    headerEl.innerText = columnName;
    return headerEl;
  }

  function createCellElement(cellData: string | number | undefined | HTMLElement)
    : HTMLTableCellElement {
    const headerEl = document.createElement('td');
    headerEl.innerText = `${cellData}`;
    return headerEl;
  }
  winnersBlock.appendChild(mainWinners);

  let totalWinnersCount: number;
  const newWinnersApi = new WinnersApi(process.env.API_URL!, {});
  const garageApi = new GarageApi(process.env.API_URL!, {});
  const renderTable = (pageNumber: number) => {
    newWinnersApi.getWinners({
      page: pageNumber,
      limit: 10,
      sort: 'wins',
      order: 'ASC',
    }, (wins) => {
      totalWinnersCount = wins.totalCount;
      headerWinners.innerText = `Winners (${totalWinnersCount})`;
      if (totalWinnersCount <= 10) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        nextTableBtn.disabled = true;
      }
      const currentPageIndex = document.createElement('div');
      headerWinners.appendChild(currentPageIndex);
      currentPageIndex.innerText = `Page #${pageNumber}`;
      const trWinners = document.createElement('tr');
      mainWinners.appendChild(trWinners);
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
      wins.rows.forEach((v, i) => {
        const trWinnerItem = document.createElement('tr');
        mainWinners.appendChild(trWinnerItem);
        garageApi.getCar(v.id, (car) => {
          const tdNumberItem = createCellElement(i + 1);
          const tdCarItem = document.createElement('td');
          tdCarItem.appendChild(createCar(car.color));
          const tdNameItem = createCellElement(car.name);
          const tdWinsItem = createCellElement(v.wins);
          const tdTimeItem = createCellElement((v.time).toFixed(2));
          const tdItemArr = [tdNumberItem, tdCarItem, tdNameItem, tdWinsItem, tdTimeItem];
          function addItemElementToTd(el: HTMLTableCellElement) {
            trWinnerItem.appendChild(el);
          }
          tdItemArr.forEach(addItemElementToTd);
        });
      });
    });
  };

  let pageNum: number = 1;
  const footerWinners = document.createElement('div');
  footerWinners.classList.add('footer-winners-btns');
  winnersBlock.appendChild(footerWinners);
  const prevTableBtn = footerWinners.appendChild(createButton('prev', () => {
    pageNum -= 1;
    mainWinners.innerHTML = '';
    renderTable(pageNum);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    nextTableBtn.disabled = false;
    if (pageNum <= 1) {
      prevTableBtn.disabled = true;
    }
  }));
  prevTableBtn.disabled = true;
  prevTableBtn.classList.add('footer-winner-button');
  const nextTableBtn = footerWinners.appendChild(createButton('next', () => {
    pageNum += 1;
    mainWinners.innerHTML = '';
    renderTable(pageNum);
    prevTableBtn.disabled = false;
    if (totalWinnersCount / 10 < pageNum + 1) {
      nextTableBtn.disabled = true;
    }
  }));
  nextTableBtn.classList.add('footer-winner-button');

  renderTable(pageNum);

  return winnersBlock;
}
