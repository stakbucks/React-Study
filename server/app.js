const express = require("express");
const app = express();
const cors = require("cors");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const e = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

let database = [];
let replys = [
  { id: 1, text: "hello" },
  { id: 2, text: "bye" },
];

app.get("/", function (req, res) {
  res.send("Server On");
});

app.delete("/delete/:id", (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send("invalid token");
  }
  const { username } = jwt.verify(access_token, "secure");
  const userInfo = database.find((user) => user.username === username);
  console.log(userInfo);
  if (!userInfo) {
    res.status(401).send("invalid token");
  } else {
    const id = parseInt(req.params.id);
    replys = replys.filter((reply) => reply.id !== id);
    res.send("deleted");
  }
});

app.post("/add", (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send("invalid token");
  }
  const { username } = jwt.verify(access_token, "secure");
  const userInfo = database.find((user) => user.username === username);
  console.log(userInfo);
  if (!userInfo) {
    res.status(401).send("invalid token");
  } else {
    const newReply = req.body;
    replys = [newReply, ...replys];
    res.send("added");
  }
});

app.get("/replys", (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send("invalid token");
  } else {
    const { username } = jwt.verify(access_token, "secure");
    const userInfo = database.find((user) => user.username === username);
    res.send(replys);
  }
});

app.get("/secure_data", (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send("invalid token");
  } else {
    const { username } = jwt.verify(access_token, "secure");
    const userInfo = database.find((user) => user.username === username);
    console.log(userInfo.username);
    res.send("good");
  }
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
  } else if (await argon2.verify(user[0].password, password)) {
    const access_token = jwt.sign({ username }, "secure");
    console.log(access_token);
    res.cookie("access_token", access_token);
    res.send("로그인 성공");
  } else {
    res.status(403).send("비밀번호 틀림");
  }

  return;
});

app.listen(4000, () => console.log("server started"));
