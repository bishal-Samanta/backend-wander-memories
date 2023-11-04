const { PrismaClient } = require('@prisma/client');
const { faker }= require('@faker-js/faker'); // Use the correct import for faker

const prisma = new PrismaClient();

const USER_COUNT = 100;
const TRIPS_COUNT = 50;
const IMAGES_COUNT = 5000;
const LOCATION_COUNT = 150;

async function seed() {

  
  // Seed Users
  // const users = [];
  // for (let i = 0; i < USER_COUNT; i++) {
  //   users.push({
  //     id: i + 1,
  //     username: faker.internet.userName() + (i + 1).toString(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //   });
  // }



  // Seed Diaries
  const trips = [];
  for (let i = 0; i < TRIPS_COUNT; i++) {
    trips.push({
      id: i + 1,
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      start_date: faker.date.past(),
      end_date: faker.date.recent()
    });
  }

  const locations = [];
  for (let i = 0; i < LOCATION_COUNT; i++) {
    locations.push({
      id: i + 1,
      name: faker.location.city(),
      latitude: parseFloat(faker.location.latitude()),
      longitude: parseFloat(faker.location.longitude()),
    });
  }

  // Seed Images and Geolocations
  const images = [];
  for (let i = 0; i < IMAGES_COUNT; i++) {
    images.push({
      id: i + 1,
      image_url: faker.image.url() + '/' + (i + 1).toString(),
      description : faker.lorem.sentence(),
      image_date : faker.date.anytime(),
      name: faker.lorem.words(2),
      trip_id: trips[i % TRIPS_COUNT].id, // Assign a diary ID
      location_id: locations[i % LOCATION_COUNT].id
      
    });
  }


  

  // Create users and diaries in the database
  // await prisma.user.createMany({ data: users });


  await prisma.trip.createMany({ data: trips });
  await prisma.image.createMany({ data: images });
  await prisma.location.createMany({ data: locations });
}

seed()
  .then(() => {
    console.log('Seeding completed successfully.');
  })
  .catch((e) => {
    console.error('Error seeding data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
