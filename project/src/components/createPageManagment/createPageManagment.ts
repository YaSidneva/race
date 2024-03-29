import { createButton } from "../createButtons/createBtn";
import Garage from "../garage/garage";
import "./style.css";

class PageManagment {
    private garage: Garage;
    private page: number;
    private limit: number;
    private pageManagmentContainer: HTMLElement;

    constructor(pageManagmentContainer: HTMLElement) {
        this.garage = new Garage(this);
        this.page = 1;
        this.limit = 7;
        this.pageManagmentContainer = pageManagmentContainer;
    }

    renderPageContainer() {
        this.pageManagmentContainer.innerHTML = '';
        const raceContainer = document.createElement('div');
        raceContainer.classList.add('race-container');
        const hearedRace = document.createElement('div');
        hearedRace.textContent = `Garage ()`;
        const page = document.createElement('div');
        page.textContent = `page ${this.page}`;
        hearedRace.appendChild(page);
        this.pageManagmentContainer.appendChild(hearedRace);
        this.pageManagmentContainer.appendChild(raceContainer);
        this.garage.renderGarage(this.page, this.limit, raceContainer);

        this.pageManagmentContainer.classList.add('page-manager-container');
        const pageManagerBlock = document.createElement('div');
        pageManagerBlock.classList.add('page-manager-block');
        this.pageManagmentContainer.appendChild(pageManagerBlock);
        const prevBtn = pageManagerBlock.appendChild(createButton('prev', e => {
            this.page -= 1;
            page.textContent = `page ${this.page}`;
            if (this.page === 1) {
                prevBtn.disabled = true;

            };
            this.garage.renderGarage(this.page, this.limit, raceContainer);
        })) as HTMLButtonElement;
        if (this.page === 1) {
            prevBtn.disabled = true;

        };
        prevBtn.className = 'page-btn next-page-btn';

        const nextBtn = pageManagerBlock.appendChild(createButton('next', e => {
            this.page += 1;
            page.textContent = `page ${this.page}`;
            // TODO: mute next button if we are on the last page
            if (this.page != 1) {
                prevBtn.disabled = false;

            };
            this.garage.renderGarage(this.page, this.limit, raceContainer);
        })) as HTMLButtonElement;
        nextBtn.className = 'page-btn prev-page-btn';

    }
}

export default PageManagment;