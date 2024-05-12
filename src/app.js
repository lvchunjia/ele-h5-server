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

server.use((req, res, next) => {
  const json = res.json.bind(res);
  res.success = (data) => {
    json({
      code: 0,
      msg: "请求成功",
      data,
    });
  };
  res.fail = (msg, code = -1, data) => {
    json({
      code,
      msg,
      data,
    });
  };
  next();
});

router(server);
const jsonRouter = JSONServer.router(db);
server.use("/api", jsonRouter);

server.listen(8000, () => {
  console.log("JSON Server is running at 8000");
});
