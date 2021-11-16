const cors = require("cors");
const express = require("express");
const app = express();
const users = require("./routes/users.route");

app.use(cors());

app.use(express.json());
app.use("/api/users", users);

require("./db/mongoose")();
// require("./app/puppeteer")();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
