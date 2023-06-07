import { descriptionPhrases, namesOfPlaces } from './data';
import { getRandomArrayElement } from '../util';
import { createPictures } from './picture';

const destinationsId = [];
export const destinations = [];

const getRandomDestination = () => {
  let id = 0;
  while (destinationsId.includes(id)) {
    id += 1;
  }
  destinationsId.push(id);
  const description = getRandomArrayElement(descriptionPhrases);
  const name = getRandomArrayElement(namesOfPlaces);
  const pictures = createPictures();
  const destination = {
    id, description, name, pictures
  };
  destinations.push(destination);
  return id;
};

const getCityNameById = (id) => destinations.find((destination) => destination.id === id).name;
const getIdByCityName = (name) => destinations.find((destination) => destination.name === name).id;
const getCityDescriptionById = (id) => destinations.find((destination) => destination.id === id).description;
const getCityPictureById = (id) => destinations.find((destination) => destination.id === id).pictures.src;
export {getRandomDestination, getCityNameById, getCityDescriptionById, getCityPictureById, getIdByCityName};
