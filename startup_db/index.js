const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/posts', (_req, res) => {
  res.send(posts);
});

// SubmitScore
apiRouter.post('/post', (req, res) => {
  posts = updatePosts(req.body, posts);
  res.send(posts);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updatePosts added the newPost to all the posts
// The posts are saved in memory and disappear whenever the service is restarted.
let posts = [];
function updatePosts(newPost, posts) {

  posts.push(newPost);

  return posts;
}
