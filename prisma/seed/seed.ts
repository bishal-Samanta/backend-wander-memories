const { PrismaClient } = require('@prisma/client');
const { faker }= require('@faker-js/faker'); // Use the correct import for faker

const prisma = new PrismaClient();

const USER_COUNT = 100;
const DAIRY_COUNT = 50;
const IMAGES_COUNT = 5000;
const GEOLOCATION_COUNT = 150;

async function seed() {
  // Seed Users
  const users = [];
  for (let i = 0; i < USER_COUNT; i++) {
    users.push({
      id: i + 1,
      username: faker.internet.userName() + (i + 1).toString(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

//   console.log(users);

  // Seed Diaries
  const diaries = [];
  for (let i = 0; i < DAIRY_COUNT; i++) {
    diaries.push({
      id: i + 1,
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
    });
  }

  // Seed Images and Geolocations
  const images = [];
  for (let i = 0; i < IMAGES_COUNT; i++) {
    images.push({
      id: i + 1,
      url: faker.image.url() + '/' + (i + 1).toString(),
      name: faker.lorem.words(2),
      diaryId: diaries[i % DAIRY_COUNT].id, // Assign a diary ID
    });
  }

  // Create associated geolocations for the image
  const geolocations = [];
  for (let i = 0; i < GEOLOCATION_COUNT; i++) {
    geolocations.push({
      name: faker.location.city(),
      lat: parseFloat(faker.location.latitude()),
      long: parseFloat(faker.location.longitude()),
      imageId: images[i % IMAGES_COUNT].id,
    });
  }

  // Create users and diaries in the database
  await prisma.user.createMany({ data: users });
  await prisma.dairy.createMany({ data: diaries });
  await prisma.image.createMany({ data: images });
  await prisma.geolocation.createMany({ data: geolocations });
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
