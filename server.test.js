const request = require('supertest');

require('dotenv').config();

// Import MongoDB module
const { MongoClient } = require('mongodb');
// URL of db on the cloud
const user = process.env.USERNAME

const pass = process.env.PASSWORD

const url = `mongodb+srv://${user}:${pass}@cluster0.ki4mv.mongodb.net/gtcDB?retryWrites=true&w=majority`;
// Connect to our db on the cloud
const connect = async () => {
  try {
    const tmp = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // Connected to db
    console.log(`Connected to database: ${tmp.databaseName}`);
    return tmp;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const webapp = require('./server');

/**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -"jest": true-
 */
let db;
beforeAll(async () => {
  db = await connect();
});

const clearDatabase = async () => {
  try {
    const result = await db.collection('players').deleteOne({ name: 'testuser' });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted player');
    } else {
      console.log('warning', 'player was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

afterAll(async () => {
  await clearDatabase();
});

describe('Create player endpoint integration test', () => {
  // expected response
  const testPlayer = {
    name: 'testuser',
    points: 0,
    maxpoints: 0,
  };

  const updateTestPlayer = {
    name: 'testuser',
    points: 12,
    maxpoints: 12,
  };

  test('Endpoint status code and response', () => request(webapp).post('/player').send(testPlayer)
    .expect(200)
    .then((response) => {
      // toMatchObject check that a JavaScript object matches
      // a subset of the properties of an object
      const player = JSON.parse(response.text);
      testPlayer._id = player._id;
      updateTestPlayer._id = player._id;
      expect(player).toMatchObject(testPlayer);
    }));

  test('The new player is in the database', async () => {
    const insertedUser = await db.collection('players').findOne({ name: 'testuser' });
    expect(insertedUser.name).toEqual('testuser');
  });

  test('Player already present cant post in the database', () => request(webapp).post('/player').send(testPlayer)
    .expect(409)
    .then((response) => {
      expect(response.text).toBe('player already exists in database');
    }));

  test('Get Player by Id', () => request(webapp).get(`/player/${testPlayer._id}`)
    .expect(200)
    .then((response) => {
      expect(JSON.parse(response.text)).toMatchObject(testPlayer);
    }));

  test('Update new player present in the database', () => request(webapp).put(`/player/${updateTestPlayer._id}`).send(updateTestPlayer)
    .expect(200)
    .then((response) => {
      const player = JSON.parse(response.text);
      expect(player).toMatchObject(updateTestPlayer);
    }));

  test('Leaders n=1 has updatedTestPlayer', () => request(webapp).get('/leaders/1')
    .expect(200)
    .then((response) => {
      const player = JSON.parse(response.text)[0];
      updateTestPlayer.__v = 0;
      expect(player).toMatchObject(updateTestPlayer);
    }));

  test('AllPlayers has updatedTestPlayer', () => request(webapp).get('/players')
    .expect(200)
    .then((response) => {
      const players = JSON.parse(response.text);
      const lastPlayer = players[players.length - 1];
      expect(lastPlayer).toMatchObject(updateTestPlayer);
    }));

  test('Deletes updatedTestPlayer', () => request(webapp).delete(`/player/${updateTestPlayer._id}`)
    .expect(200)
    .then((response) => {
      const player = JSON.parse(response.text);
      expect(player).toMatchObject(updateTestPlayer);
    }));
});
