import { createButton } from '../createButtons/createBtn';
import GarageApi from '../../api/garageApi';
import PageManagment from '../createPageManagment/createPageManagment';
import { winners } from '../winners/winners';
import '../global.css';
import { garage } from '../garage/garage';

class App {
  private garageApi: GarageApi;

  private pageManager: PageManagment;

  constructor() {
    this.garageApi = new GarageApi(process.env.API_URL!, {});
  }

  start() {
    const body = document.querySelector('body') as HTMLElement;
    const header = document.createElement('div') as HTMLElement;
    body.appendChild(header);
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');
    body.appendChild(mainContainer);
    const headerBtn = document.createElement('div');
    headerBtn.classList.add('header-btn-block');
    header.appendChild(headerBtn);
    const pageManagmentContainer = document.createElement('div');
    this.pageManager = new PageManagment(pageManagmentContainer);
    mainContainer.appendChild(garage(this.pageManager, this.garageApi));
    const btnElGarage = createButton('To garage', () => {
      mainContainer.innerHTML = '';
      mainContainer.appendChild(garage(this.pageManager, this.garageApi));
    });
    const btnElWinner = createButton('To winners', () => {
      mainContainer.innerHTML = '';
      mainContainer.appendChild(winners());
    });
    headerBtn.appendChild(btnElGarage);
    headerBtn.appendChild(btnElWinner);
  }
}

export default App;
