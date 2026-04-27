const express = require("express");
const fs = require("fs");
const crypto = require("crypto");

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


const SECRET = "12345678901234567890123456789012";
const IV = Buffer.alloc(16, 0);

function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET, IV);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
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

  const token = Math.random().toString(36);
  user.token = token;
  writeFile(USERS_FILE, users);

  res.json({ token });
});


app.post("/add", (req, res) => {
  const token = req.headers.authorization;

  const users = readFile(USERS_FILE);
  const user = users.find(u => u.token === token);

  if (!user) {
    return res.status(401).send("Nie jesteś zalogowany");
  }

  const { title, password } = req.body;
  const passwords = readFile(PASSWORDS_FILE);

  passwords.push({
    login: user.login,
    title,
    password: encrypt(password)
  });

  writeFile(PASSWORDS_FILE, passwords);

  res.send("Dodano hasło");
});


app.get("/passwords", (req, res) => {
  const token = req.headers.authorization;

  const users = readFile(USERS_FILE);

  const user = users.find(u => u.token === token);

  if (!user) {
    return res.status(401).send("Nie jesteś zalogowany");
  }

  const passwords = readFile(PASSWORDS_FILE);

  const userPasswords = passwords
  .filter(p => p.login === user.login)
  .map(p => {
    try {
      return {
        login: p.login,
        title: p.title,
        password: decrypt(p.password)
      };
    } catch (err) {
      return {
        login: p.login,
        title: p.title,
        password: p.password
      };
    }
  });

  res.json(userPasswords);
});

app.listen(3000, () => {
  console.log("Działa na http://localhost:3000");
});