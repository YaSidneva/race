// import GarageApi from "../../api/garageApi";
// import { Car } from "../../types";
// import { createButton } from "../createButtons/createBtn";
// import { createRoad } from "../createRacePart/createRoad";
// import "./style.css";

// class CarComponent {
//     private car: Car;
//     private garageApi: GarageApi;

//     constructor(car: Car) {
//         this.car = car;
//         this.garageApi = new GarageApi(process.env.API_URL!, {});
//     }

//     createRaceItem(): HTMLElement {

//         const newItem = document.createElement('div');
//         newItem.classList.add('item-car');
//         const carHeaderBtn = document.createElement('div');
//         newItem.appendChild(carHeaderBtn);
//         carHeaderBtn.classList.add('car-header');
//         carHeaderBtn.appendChild(createButton('select', e => {
//             const updTextfield = document.querySelector('.upd-container').querySelector('.textfield') as HTMLInputElement;
//             updTextfield.value = this.car.name;
//             const updColorPicker = document.querySelector('.upd-container').querySelector('.color-picker') as HTMLInputElement;
//             updColorPicker.value = this.car.color;
//         })).classList.add('car-header-btn');
//         carHeaderBtn.appendChild(createButton('remove', e => {
//             this.garageApi.removeCar(this.car.id, c => {
                
//              });
//         })).classList.add('car-header-btn');

//         const titleCar = document.createElement('div');
//         titleCar.textContent = this.car.name;
//         titleCar.classList.add('title-car');
//         carHeaderBtn.appendChild(titleCar);
//         const road = newItem.appendChild(createRoad(this.car.color));
//         return newItem;
//     }
// }