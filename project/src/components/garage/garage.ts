import PageManagment from '../createPageManagment/createPageManagment';
import { createCar, updateCar } from '../createAddPart/createAddCar';
import { createBtnContainer } from '../createAddPart/createBtnPart';
import GarageApi from '../../api/garageApi';

export function garage(pageManager: PageManagment, garageApi: GarageApi): HTMLElement {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');

  const editSaveContainer = document.createElement('div');
  editSaveContainer.classList.add('update-container');
  mainContainer.appendChild(editSaveContainer);

  const addCarBlock = document.createElement('div');
  addCarBlock.classList.add('car-container');
  editSaveContainer.appendChild(addCarBlock);
  addCarBlock.appendChild(createCar('Create car', (newCar) => {
    garageApi.createCar(
      newCar,
      () => {
        pageManager.renderPageContainer();
      },
    );
  }));

  addCarBlock.appendChild(updateCar('Update car'));
  editSaveContainer.appendChild(createBtnContainer(pageManager));

  mainContainer.appendChild(pageManager.renderPageContainer());
  return mainContainer;
}
