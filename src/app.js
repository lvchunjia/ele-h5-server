const path = require("path");
const JSONServer = require("json-server");
const router = require("./router");
const db = require("./db")();

const server = JSONServer.create();

const middlewares = JSONServer.defaults({
  static: path.join(__dirname, "../public"),
});
server.use(middlewares);

server.use(JSONServer.bodyParser);

router(server);
const jsonRouter = JSONServer.router(db);
server.use("/api", jsonRouter);

server.listen(8000, () => {
  console.log("JSON Server is running at 8000");
});
