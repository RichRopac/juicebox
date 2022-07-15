const { 
  client,
  getAllUsers,
  createUser,
} = require('./index');

async function createInitialUsers() {
  try {
    console.log("starting to create users...")

    const albert = await createUser({ username: 'albert', password: 'bertie99' });

    console.log(albert);
    console.log('finished creating users!')
  } catch(error) {
    console.error('error creating users');
    throw error;
  } 
}


async function dropTables() {
  try {
    console.log('starting to drop tables...');
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);

    console.log('finished dropping tables!');
  } catch (error) {
    console.error('error dropping tables!');
    throw error; // we pass the error up to the function that calls dropTables
  }
}

// this function should call a query which creates all tables for our database 
async function createTables() {
  try {
    console.log('Starting to build tables...');
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
    `);
    console.log('finished building tables!');
  } catch (error) {
    console.error('error building tables!');
    throw error; // we pass the error up to the function that calls createTables
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    console.log("starting to test database...");
    // client.connect();

    // queries are promises, so we can await them
    const users = await getAllUsers();
    console.log('getAllUsers',users);


    console.log('finished database tests!');
  } catch (error) {
    console.error('error testing database!');
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());