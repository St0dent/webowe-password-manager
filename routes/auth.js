const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { readFile, writeFile } = require("../utils/files");
const USERS_FILE = "./data/users.json";

function auth(req, res, next) {
  const token = req.headers.authorization;

  const users = readFile(USERS_FILE);
  const user = users.find(u => u.token === token);

  if (!user) {
    return res.status(401).json({ message: "Brak autoryzacji" });
  }

  req.user = user;
  next();
}


router.post("/register", async (req, res) => {
    const { login, password } = req.body;
    const users = readFile(USERS_FILE);

    if (users.find(u => u.login === login)) {
        return res.send("User istnieje");
    }

    const hash = await bcrypt.hash(password, 10);

    users.push({
        login,
        password: hash,
        role: "user"
    });

    writeFile(USERS_FILE, users);

    res.send("Zarejestrowano nowego użytkownika");
});


router.post("/login", async (req, res) => {
    const { login, password } = req.body;
    const users = readFile(USERS_FILE);
    const user = users.find(u => u.login === login);

    if (!user) return res.send("Błąd");

    const ONE_HOUR = 1000 * 60 * 60;
    if (Date.now() - user.tokenCreatedAt > ONE_HOUR) {
        return res.status(401).send("Sesja wygasła");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send("Błąd");

    const token = Math.random().toString(36);
    const key = crypto.createHash("sha256").update(password).digest("hex");
    user.token = token;
    user.key = key;
    user.tokenCreatedAt = Date.now();

    writeFile(USERS_FILE, users);

    res.json({ token });
});


router.post("/logout", auth, (req, res) => {
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.login === req.user.login);

  if (!user) {
    return res.status(404).json({ message: "Nie znaleziono usera" });
  }

  delete user.token;
  delete user.key;
  delete user.tokenCreatedAt;

  writeFile(USERS_FILE, users);

  res.json({ message: "Wylogowano" });
});

module.exports = router;