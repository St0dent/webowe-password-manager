const express = require("express");
const router = express.Router();

const { readFile, writeFile } = require("../utils/files");
const { encrypt, decrypt } = require("../utils/encryption");

const USERS_FILE = "./data/users.json";
const PASSWORDS_FILE = "./data/passwords.json";

function auth(req, res, next) {
  const token = req.headers.authorization;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.token === token);

  if (!user || !user.key) {
    return res.status(401).send("Brak klucza - zaloguj się ponownie");
  }

  req.user = user;
  next();
}


router.post("/add", auth, (req, res) => {
  const { title, password } = req.body;
  const passwords = readFile(PASSWORDS_FILE);

  passwords.push({
    login: req.user.login,
    title,
    password: encrypt(password, req.user.key)
  });

  writeFile(PASSWORDS_FILE, passwords);

  res.send("OK");
});


router.get("/passwords", auth, (req, res) => {
  const passwords = readFile(PASSWORDS_FILE);
  const userPasswords = passwords
    .filter(p => p.login === req.user.login)
    .map(p => {
      try {
        return {
          title: p.title,
          password: decrypt(p.password, req.user.key)
        };
      } catch (err) {
        return {
          title: p.title,
          password: "Błąd odszyfrowania"
        };
      }
    });

  res.json(userPasswords);
});

module.exports = router;