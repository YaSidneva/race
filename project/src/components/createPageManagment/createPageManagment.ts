import GarageApi from "../../api/garageApi";
import { createButton } from "../createButtons/createBtn";
import { createRace } from "../createRacePart/createRace";
import "./style.css";

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
        const prevBtn = pageManagerBlock.appendChild(createButton('prev', e => {
            this.page -= 1;
            if (this.page === 1) {
                prevBtn.disabled = true;

            };
            this.renderGarage(this.page, this.limit, raceContainer, hearedRace);
        })) as HTMLButtonElement;
        if (this.page === 1) {
            prevBtn.disabled = true;

        };
        prevBtn.className = 'page-btn next-page-btn';

        const nextBtn = pageManagerBlock.appendChild(createButton('next', e => {
            this.page += 1;
            // TODO: mute next button if we are on the last page
            if (this.page != 1) {
                prevBtn.disabled = false;

            };
            this.renderGarage(this.page, this.limit, raceContainer, hearedRace);
        })) as HTMLButtonElement;
        nextBtn.className = 'page-btn prev-page-btn';

    }

    renderGarage(page: number, limit: number, raceContainer: HTMLElement, hearedRace: HTMLDivElement) {
        raceContainer.innerHTML = '';
        this.garageApi.getCars(page, limit, c => {
            this.totalCount = c.totalCount;
            hearedRace.innerHTML = '';
            hearedRace.textContent = `Garage (${this.totalCount})`;

            const page = document.createElement('div');
            page.textContent = `page ${this.page}`;
            hearedRace.appendChild(page);

            const race = raceContainer.appendChild(createRace(c, carId => {
                this.garageApi.removeCar(carId, c => { this.renderPageContainer() });
            }));
        });
    }
}

export default PageManagment;