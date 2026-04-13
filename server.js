const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const USERS_FILE = "users.json";
const PASSWORDS_FILE = "passwords.json";

function readFile(file) {
  return JSON.parse(fs.readFileSync(file));
}

function writeFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.post("/register", (req, res) => {
  const { login, password } = req.body;

  const users = readFile(USERS_FILE);

  if (users.find(u => u.login === login)) {
    return res.send("Użytkownik już istnieje");
  }

  users.push({ login, password });
  writeFile(USERS_FILE, users);

  res.send("OK");
});

app.post("/login", (req, res) => {
  const { login, password } = req.body;

  const users = readFile(USERS_FILE);

  const user = users.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.send("Błąd logowania");
  }

  res.send("Zalogowano");
});

app.post("/add", (req, res) => {
  const { login, title, password } = req.body;

  const passwords = readFile(PASSWORDS_FILE);

  passwords.push({ login, title, password });

  writeFile(PASSWORDS_FILE, passwords);

  res.send("Dodano hasło");
});

app.get("/passwords/:login", (req, res) => {
  const { login } = req.params;

  const passwords = readFile(PASSWORDS_FILE);

  const userPasswords = passwords.filter(p => p.login === login);

  res.json(userPasswords);
});

app.listen(3000, () => {
  console.log("Działa na http://localhost:3000");
});