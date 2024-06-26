const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const postCollection = db.collection('post');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addPost(post) {
  postCollection.insertOne(post);
}

// FIXME!!! Fix the query and option below, may be query the posts based on length or date.
// Right now it is just returning 10 random posts from the database.
function getPosts() { 
  // const query = { post: { $gt: 0, $lt: 900 } };
  // const options = {
  //   sort: { score: -1 },
  //   limit: 10,
  // };
  // const cursor = postCollection.find(query, options);

  const pipeline = [
    { $sample: { size: 10 } }
  ];
  const cursor = postCollection.aggregate(pipeline);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addPost,
  getPosts,
};
