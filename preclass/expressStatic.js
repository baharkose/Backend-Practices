const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json);
app.post("/", (req, res) => {
  console.log(req.body.name);
  res.end();
});

app.get("/", (req, res) => {
  res.send("hello backend");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is listening on port 3000");
});
