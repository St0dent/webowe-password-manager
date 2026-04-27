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

  if (!title || !password) {
    return res.status(400).json({ message: "Brak danych" });
  }

  const passwords = readFile(PASSWORDS_FILE);
  const newEntry = {
    id: Date.now().toString(),
    login: req.user.login,
    title,
    password: encrypt(password, req.user.key)
  };

  passwords.push(newEntry);
  writeFile(PASSWORDS_FILE, passwords);

  res.status(201).json({
    message: "Dodano hasło",
    id: newEntry.id
  });
});


router.get("/passwords", auth, (req, res) => {
  const passwords = readFile(PASSWORDS_FILE);

  let filtered;
  if (req.user.role === "admin") {
    filtered = passwords;
  } else {
    filtered = passwords.filter(p => p.login === req.user.login);
  }

  const result = filtered.map(p => {
    try {
      return {
        id: p.id,
        title: p.title,
        password: decrypt(p.password, req.user.key)
      };
    } catch {
      return {
        id: p.id,
        title: p.title,
        password: "Błąd odszyfrowania"
      };
    }
  });

  res.status(200).json(result);
});


router.delete("/password/:id", auth, (req, res) => {
  const passwords = readFile(PASSWORDS_FILE);
  const entry = passwords.find(p => p.id === req.params.id);

  if (!entry) {
    return res.status(404).json({ message: "Nie znaleziono hasła" });
  }
  if (req.user.role !== "admin" && entry.login !== req.user.login) {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  const newPasswords = passwords.filter(p => p.id !== req.params.id);

  writeFile(PASSWORDS_FILE, newPasswords);

  res.status(200).json({ message: "Usunięto hasło" });
});


router.put("/password/:id", auth, (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "Brak nowego hasła" });
  }

  const passwords = readFile(PASSWORDS_FILE);
  const entry = passwords.find(p => p.id === req.params.id);

  if (!entry) {
    return res.status(404).json({ message: "Nie znaleziono hasła" });
  }
  if (req.user.role !== "admin" && entry.login !== req.user.login) {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  entry.password = encrypt(newPassword, req.user.key);

  writeFile(PASSWORDS_FILE, passwords);

  res.status(200).json({ message: "Zmieniono hasło" });
});


router.get("/search", auth, (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Brak zapytania" });
  }

  const passwords = readFile(PASSWORDS_FILE);

  let filtered = passwords;

  if (req.user.role !== "admin") {
    filtered = filtered.filter(p => p.login === req.user.login);
  }

  const results = filtered
    .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    .map(p => ({
      id: p.id,
      title: p.title,
      password: decrypt(p.password, req.user.key)
    }));

  if (results.length === 0) {
    return res.status(404).json({ message: "Brak wyników" });
  }

  res.status(200).json(results);
});

module.exports = router;