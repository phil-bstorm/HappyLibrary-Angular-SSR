const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("./json-server/fakeApi.json");

/* CORS */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/*
Rules Route permissions:
- 664	User must be logged to write the resource.
      Everyone can read the resource.

- 660	User must be logged to write or read the resource.

- 644	User must own the resource to write the resource.
      Everyone can read the resource.

- 640	User must own the resource to write the resource.
      User must be logged to read the resource.

- 600	User must own the resource to write or read the resource.

- 444	No one can write the resource.
      Everyone can read the resource.

- 440	No one can write the resource.
      User must be logged to read the resource.

- 400	No one can write the resource.
      User must own the resource to read the resource.
 */
const rules = auth.rewriter({
  users: 600, // User must own the resource to write or read the resource.
  books: 664, // 664	User must be logged to write the resource but Everyone can read the resource.
});

server.db = router.db;
server.use(rules);
server.use(auth); // ⚠️ Toujours avant `router`
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on port http://localhost:3000");
});
