const express = require("express");
const app = express();
const cors = require("cors");
const argon2 = require("argon2");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let database = [];

app.get("/", function (req, res) {
  res.send("Server On");
});

app.get("/users", (req, res) => {
  res.send(database);
});

app.post("/signup", async (req, res) => {
  const { username, password, birthday } = req.body;
  const hash = await argon2.hash(password);
  database.push({
    id: Date.now(),
    username,
    password: hash,
    birthday,
  });
  res.send("success");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = database.filter((user) => user.username === username);
  if (user.length === 0) {
    res.status(403).send("해당 유저 없음");
  } else if (await argon2.verify(user[0].password, password))
    res.send("로그인 성공");
  else {
    res.status(403).send("비밀번호 틀림");
  }

  return;
});

app.listen(4000, () => console.log("server started"));
