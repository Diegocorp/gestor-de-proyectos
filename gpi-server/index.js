const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const Connection = require("./Database");
const appRouter = require("./Routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

Connection.on("error", console.error.bind(console, "connection error:"));
Connection.once("open", function () {
  console.log("We're connected!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", appRouter);

app.use(express.static(path.join(__dirname, "/gpi/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/gpi/build", "index.html"));
});

app.listen(process.env.PORT || 1818, () => {
  console.log(`Server running on port ${process.env.PORT || 1818}`);
});
