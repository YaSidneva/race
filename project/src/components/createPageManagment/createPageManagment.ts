import { createButton } from "../createButtons/createBtn";
import Garage from "../garage/garage";
import "./style.css";

class PageManagment {
    private garage: Garage;
    private page: number;
    private limit: number;

    constructor() {
        this.garage = new Garage();
        this.page = 1;
        this.limit = 7;
    }

    renderPageContainer(pageManagmentContainer: HTMLElement): HTMLElement {
        pageManagmentContainer.innerHTML = '';
        const raceContainer = document.createElement('div');
        raceContainer.classList.add('race-container');
        const hearedRace = document.createElement('div');
        hearedRace.textContent = `Garage ()`;
        const page = document.createElement('div');
        page.textContent = `page ${this.page}`;
        hearedRace.appendChild(page);
        pageManagmentContainer.appendChild(hearedRace);
        pageManagmentContainer.appendChild(raceContainer);
        this.garage.renderGarage(this.page, this.limit, raceContainer);

        pageManagmentContainer.classList.add('page-manager-container');
        const pageManagerBlock = document.createElement('div');
        pageManagerBlock.classList.add('page-manager-block');
        pageManagmentContainer.appendChild(pageManagerBlock);
        pageManagerBlock.appendChild(createButton('prev', e => {
            this.page -= 1;
            page.textContent = `page ${this.page}`;
            // TODO: mute prev button if we are on the first page
            this.garage.renderGarage(this.page, this.limit, raceContainer);
        })).className = 'page-btn next-page-btn';

        pageManagerBlock.appendChild(createButton('next', e => {
            this.page += 1;
            page.textContent = `page ${this.page}`;
            // TODO: mute next button if we are on the last page
            this.garage.renderGarage(this.page, this.limit, raceContainer);
        })).className = 'page-btn prev-page-btn';

        return pageManagmentContainer;
    }
}

export default PageManagment;