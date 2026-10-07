import { cars } from '../data/cars';

export const getAllCars = () => cars;

export const getCarById = (id) =>
  cars.find((car) => String(car.id) === String(id));

export const getFeaturedCars = () =>
  cars.filter((car) => [1, 3, 6, 9, 22, 24].includes(car.id));

export const searchCars = (searchTerm = '') => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return cars.filter((car) =>
    [car.name, car.type, car.location].join(' ').toLowerCase().includes(normalizedSearch)
  );
};

export const filterCars = ({
  searchTerm = '',
  selectedType = 'All',
  selectedFuel = 'All',
  selectedTransmission = 'All',
} = {}) =>
  searchCars(searchTerm).filter((car) => {
    const matchesType = selectedType === 'All' || car.type === selectedType;
    const matchesFuel = selectedFuel === 'All' || car.fuel === selectedFuel;
    const matchesTransmission =
      selectedTransmission === 'All' || car.transmission === selectedTransmission;

    return matchesType && matchesFuel && matchesTransmission;
  });