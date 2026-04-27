const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcrypt");


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


function encrypt(text, key) {
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

function decrypt(text, key) {
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );

  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}


app.post("/register", async (req, res) => {
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


app.post("/login", async (req, res) => {
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


app.post("/add", (req, res) => {
  const token = req.headers.authorization;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.token === token);

  if (!user) return res.status(401).send("Brak auth");

  const { title, password } = req.body;
  const passwords = readFile(PASSWORDS_FILE);

  passwords.push({
    login: user.login,
    title,
    password: encrypt(password, user.key)
  });

  writeFile(PASSWORDS_FILE, passwords);

  res.send("OK");
});


app.get("/passwords", (req, res) => {
  const token = req.headers.authorization;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.token === token);

  if (!user || !user.key) {
    return res.status(401).send("Brak klucza - zaloguj się ponownie");
  }

  const passwords = readFile(PASSWORDS_FILE);

  const userPasswords = passwords
    .filter(p => p.login === user.login)
    .map(p => {
      try {
        return {
          title: p.title,
          password: decrypt(p.password, user.key)
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

app.listen(3000, () => {
  console.log("Działa na http://localhost:3000");
});