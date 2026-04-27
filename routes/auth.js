const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { readFile, writeFile } = require("../utils/files");

const USERS_FILE = "./data/users.json";

router.post("/register", async (req, res) => {
  const { login, password } = req.body;
  const users = readFile(USERS_FILE);

  if (users.find(u => u.login === login)) {
    return res.send("User istnieje");
  }

  const hash = await bcrypt.hash(password, 10);

  users.push({
    login,
    password: hash
  });

  writeFile(USERS_FILE, users);

  res.send("OK");
});


router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.login === login);

  if (!user) return res.send("Błąd");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.send("Błąd");

  const token = Math.random().toString(36);
  const key = crypto.createHash("sha256").update(password).digest("hex");
  user.token = token;
  user.key = key;

  writeFile(USERS_FILE, users);

  res.json({ token });
});

module.exports = router;