const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const router = express.Router();

// router.get(/^\/a\d(c{2}|c{3})$/, (req, res) => {
//   res.send("path matched");
// });

const students = [
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Smith", age: 22 },
  { id: 3, name: "Tom Brown", age: 21 },
];

router.get("/students", (req, res) => {
  //   res.json(students);
  res.end(JSON.stringify(students));
  //   res.send(students);
});
console.log(students);

router.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = student.find((student) => student.id === studentId);
  student && res.send(student);
  //   res.send(students);
});
console.log(students);

app.use((req, res, next) => {
  console.log("middleware");
  next();
});




app.use(router);
app.listen(8000);
