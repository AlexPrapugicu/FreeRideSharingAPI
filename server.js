const http = require("http");
const app = require("./app");
const logger = require("./src/config/logger.config");
const port = 8080;

const server = http.createServer(app);
server.listen(port, () => {
  logger.inform(`listening on port: ${port}`);
});
