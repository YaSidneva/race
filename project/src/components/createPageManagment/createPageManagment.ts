/* eslint-disable no-param-reassign */
import GarageApi from '../../api/garageApi';
import { createButton } from '../createButtons/createBtn';
import { createRace } from '../createRacePart/createRace';
import './style.css';

class PageManagment {
  private page: number;

  private limit: number;

  private pageManagmentContainer: HTMLElement;

  private garageApi: GarageApi;

  private totalCount: number;

  constructor(pageManagmentContainer: HTMLElement) {
    this.page = 1;
    this.limit = 7;
    this.pageManagmentContainer = pageManagmentContainer;
    this.garageApi = new GarageApi(process.env.API_URL!, {});
  }

  renderPageContainer() {
    this.pageManagmentContainer.innerHTML = '';
    const raceContainer = document.createElement('div');
    raceContainer.classList.add('race-container');
    const hearedRace = document.createElement('div');
    this.pageManagmentContainer.appendChild(hearedRace);
    this.pageManagmentContainer.appendChild(raceContainer);
    this.renderGarage(this.page, this.limit, raceContainer, hearedRace);

    this.pageManagmentContainer.classList.add('page-manager-container');
    const pageManagerBlock = document.createElement('div');
    pageManagerBlock.classList.add('page-manager-block');
    this.pageManagmentContainer.appendChild(pageManagerBlock);
    const prevBtn = pageManagerBlock.appendChild(createButton('prev', () => {
      this.page -= 1;
      if (this.page === 1) {
        prevBtn.disabled = true;
      }
      if (this.page + 1 < (this.totalCount + this.limit) / this.limit) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        nextBtn.disabled = false;
      }
      this.renderGarage(this.page, this.limit, raceContainer, hearedRace);
    })) as HTMLButtonElement;
    if (this.page === 1) {
      prevBtn.disabled = true;
    }
    prevBtn.className = 'page-btn next-page-btn';

    const nextBtn = pageManagerBlock.appendChild(createButton('next', () => {
      this.page += 1;
      // TODO: mute next button if we are on the last page
      if (this.page !== 1) {
        prevBtn.disabled = false;
      }
      if (this.page + 1 >= (this.totalCount + this.limit) / this.limit) {
        nextBtn.disabled = true;
      }
      this.renderGarage(this.page, this.limit, raceContainer, hearedRace);
    })) as HTMLButtonElement;
    nextBtn.className = 'page-btn prev-page-btn';
    if (this.page + 1 >= (this.totalCount + this.limit) / this.limit) {
      nextBtn.disabled = true;
    }
  }

  renderGarage(
    page: number,
    limit: number,
    raceContainer: HTMLElement,
    hearedRace: HTMLDivElement,
  ) {
    raceContainer.innerHTML = '';
    this.garageApi.getCars(page, limit, (c) => {
      this.totalCount = c.totalCount;
      hearedRace.innerHTML = '';
      hearedRace.textContent = `Garage (${this.totalCount})`;

      const pageElement = document.createElement('div');
      pageElement.textContent = `page ${this.page}`;
      hearedRace.appendChild(pageElement);

      raceContainer.appendChild(createRace(c, (carId) => {
        this.garageApi.removeCar(carId, () => { this.renderPageContainer(); });
      }));
    });
  }
}

export default PageManagment;
