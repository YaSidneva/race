/* eslint-disable no-param-reassign */
import GarageApi from '../../api/garageApi';
import WinnersApi from '../../api/winnersApi';
import { RaceResult, Winner } from '../../types';
import { createButton } from '../createButtons/createBtn';
import { createRace } from '../createRacePart/createRace';
import CarElement from '../createRacePart/createRoad';
import './style.css';

class PageManagment {
  private page: number;

  private limit: number;

  public pageManagmentContainer: HTMLElement;

  private garageApi: GarageApi;

  private totalCount: number;

  private carElements: Array<CarElement>;

  private winnerApi: WinnersApi;

  private winnerRes: Winner;

  constructor(pageManagmentContainer: HTMLElement) {
    this.page = 1;
    this.limit = 7;
    this.pageManagmentContainer = pageManagmentContainer;
    this.garageApi = new GarageApi(process.env.API_URL!, {});
    this.winnerApi = new WinnersApi(process.env.API_URL!, {});
  }

  startRace(): Promise<RaceResult> {
    return Promise.all(this.carElements
      .map((carElement) => carElement.startDriving()
        .then((r): RaceResult => ({
          car: carElement.car,
          time: r,
        }
        ))))
      .then((results) => results.reduce((minObject, currentObject) => (
        currentObject.time < minObject.time ? currentObject : minObject), results[0]));
    // .then((winner) => {
    //   this.winnerApi.createWinner(winner, () => {

    //   });
    // });
  }

  renderPageContainer(): HTMLElement {
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
    return this.pageManagmentContainer;
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
      hearedRace.classList.add('header-race');
      hearedRace.innerHTML = '';
      hearedRace.textContent = `Garage (${this.totalCount})`;

      const pageElement = document.createElement('div');
      pageElement.textContent = `page ${this.page}`;
      hearedRace.appendChild(pageElement);

      const [raceElement, carElements] = createRace(
        c,
        (carId) => {
          this.garageApi.removeCar(carId, () => { this.renderPageContainer(); });
        },
        (updatedCar) => {
          this.garageApi.updateCar(updatedCar, updatedCar.id, () => this.renderPageContainer());
        },
      );

      this.carElements = carElements;

      raceContainer.appendChild(raceElement);
    });
  }
}

export default PageManagment;
