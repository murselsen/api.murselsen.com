import express from "express";
import dotenv from "dotenv";
import process from "process";
const router = express.Router();


dotenv.config();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

const fetchGithubUser = (res, url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
}


router.use(timeLog);
router.get("/", (req, res) => {
  console.log("Github Token:", process.env.GITHUB_TOKEN);
  res.json([
    "RestApi World! Welcome to the Server",]);
});
router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  const url = `https://api.github.com/users/${username}`;
  fetchGithubUser(res, url);

})

// User Repositories
router.get("/user/:username/repos", (req, res) => {
  const url = `https://api.github.com/users/${req.params.username}/repos`;
  fetchGithubUser(res, url);
});
router.get("/user/:username/repos/:repoName", (req, res) => {
  const url = `https://api.github.com/repos/${req.params.username}/${req.params.repoName}`;
  fetchGithubUser(res, url);
});
// User's Pinned Warehouses
// https://gh-pinned-repos.egoist.dev/?username=mursel
router.get('/user/:username/repos/pinned', async (req, res) => {
  const query = `
    {
      user(login: "${req.params.username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              languages(first: 1) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(400).json({ error: data.errors });
    }

    res.json(data.data.user.pinnedItems.nodes);
  } catch (error) {
    console.error('GraphQL API Hatası:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Organizations
router.get('/user/:username/orgs', (req, res) => {
  const url = `https://api.github.com/users/${req.params.username}/orgs`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});
router.get('/orgs/:orgName', (req, res) => {
  const url = `https://api.github.com/orgs/${req.params.orgName}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});
router.get('/orgs/:orgName/members', (req, res) => {
  const url = `https://api.github.com/orgs/${req.params.orgName}/members`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

// User Following
router.get('/user/:username/following', (req, res) => {
  const url = `https://api.github.com/users/${req.params.username}/following`;
  fetchGithubUser(res, url);
});
// User Followers
router.get('/user/:username/followers', (req, res) => {
  const url = `https://api.github.com/users/${req.params.username}/followers`;
  fetchGithubUser(res, url);
});

export default router;
