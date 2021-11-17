const cors = require("cors");
const express = require("express");
const app = express();
const users = require("./routes/users.route");
const data = require("./routes/data.route");

app.use(cors());

app.use(express.json());
app.use("/api/users", users);
app.use("/api/data", data);

require("./db/mongoose")();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
