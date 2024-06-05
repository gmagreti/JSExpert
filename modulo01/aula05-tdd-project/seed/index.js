const faker = require('faker');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/CarCategory');
const Customer = require('../src/entities/Customer');

const {join} = require('path');
const {writeFile} = require('fs/promises');

const seederBaseFOlder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
});

const cars = [];
for (let i = 0; i < ITEMS_AMOUNT; i++) {
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    });

    carCategory.carIds.push(car.id);
    cars.push(car);
}

const write = (filename, data) => writeFile(join(seederBaseFOlder, filename), JSON.stringify(data));

;(async () => {
    await write('cars.json', cars);
    await write('carCategories.json', [carCategory]);
    await write('customers.json', [new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({min: 18, max: 50}),
    })]);
    console.log('seeder has been executed', cars)
})();
