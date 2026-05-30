# webowe-password-manager
Repo do projektu password manager

# Password Manager API

Prosty backend aplikacji typu Password Manager napisany w Node.js i Express.

Projekt umożliwia:

- rejestrację użytkowników,
- logowanie i wylogowanie,
- przechowywanie haseł,
- szyfrowanie zapisanych haseł,
- wyszukiwanie haseł,
- edycję haseł,
- usuwanie haseł,
- kontrolę dostępu użytkowników.

# Technologie

- Node.js
- Express
- bcrypt
- crypto
- JSON (jako magazyn danych)

---

# Uruchomienie projektu

## Instalacja zależności

```bash
npm install
```

## Uruchomienie serwera

```bash
node server.js
```

Serwer uruchomi się pod adresem:

```text
http://localhost:3000
```

---

# Struktura projektu

```text
project/
│
├── server.js
│
├── routes/
│   ├── auth.js
│   └── passwords.js
│
├── utils/
│   ├── auth.js
│   ├── files.js
│   └── encryption.js
│
├── data/
│   ├── users.json
│   └── passwords.json
│
└── README.md
```

---

# Funkcjonalności

## Rejestracja użytkownika

Endpoint:

```http
POST /register
```

Przykładowe dane:

```json
{
  "login": "user1",
  "password": "haslo123"
}
```

Opis:

- sprawdza czy użytkownik istnieje,
- haszuje hasło za pomocą bcrypt,
- zapisuje użytkownika do pliku users.json.

---

## Logowanie

Endpoint:

```http
POST /login
```

Przykładowe dane:

```json
{
  "login": "user1",
  "password": "haslo123"
}
```

Opis:

- weryfikuje dane użytkownika,
- generuje token sesji,
- generuje klucz szyfrujący,
- zapisuje dane sesji.

Przykładowa odpowiedź:

```json
{
  "token": "abc123xyz"
}
```

---

## Wylogowanie

Endpoint:

```http
POST /logout
```

Nagłówek:

```http
Authorization: TOKEN
```

Opis:

- usuwa token użytkownika,
- usuwa klucz szyfrujący,
- kończy sesję.

---

## Dodawanie hasła

Endpoint:

```http
POST /add
```

Nagłówek:

```http
Authorization: TOKEN
```

Przykładowe dane:

```json
{
  "title": "Facebook",
  "password": "facebook123"
}
```

Opis:

- szyfruje hasło,
- zapisuje je do pliku passwords.json,
- przypisuje właściciela wpisu.

---

## Pobieranie haseł

Endpoint:

```http
GET /passwords
```

Nagłówek:

```http
Authorization: TOKEN
```

Opis:

- pobiera hasła zalogowanego użytkownika,
- odszyfrowuje zapisane dane,
- zwraca listę wpisów.

---

## Wyszukiwanie haseł

Endpoint:

```http
GET /search?q=facebook
```

Nagłówek:

```http
Authorization: TOKEN
```

Opis:

- wyszukuje wpisy po nazwie,
- zwraca tylko wpisy dostępne dla użytkownika.

---

## Edycja hasła

Endpoint:

```http
PUT /password/:id
```

Nagłówek:

```http
Authorization: TOKEN
```

Przykładowe dane:

```json
{
  "newPassword": "nowehaslo"
}
```

Opis:

- sprawdza właściciela wpisu,
- szyfruje nowe hasło,
- zapisuje zmiany.

---

## Usuwanie hasła

Endpoint:

```http
DELETE /password/:id
```

Nagłówek:

```http
Authorization: TOKEN
```

Opis:

- sprawdza właściciela wpisu,
- usuwa wybrane hasło.

---

# Role użytkowników

Projekt obsługuje dwa typy użytkowników:

## User

Może:

- dodawać hasła,
- przeglądać własne hasła,
- edytować własne hasła,
- usuwać własne hasła.

Nie może:

- przeglądać danych innych użytkowników,
- modyfikować danych innych użytkowników.

## Admin

Może:

- wykonywać wszystkie operacje,
- zarządzać danymi wszystkich użytkowników.

---

# Bezpieczeństwo

## Haszowanie haseł użytkowników

Hasła użytkowników są przechowywane jako hashe przy użyciu biblioteki bcrypt.

Przykład:

```text
haslo123
↓
$2b$10$...
```

Oryginalne hasło nie jest przechowywane w systemie.

---

## Szyfrowanie zapisanych haseł

Hasła zapisane przez użytkowników są szyfrowane algorytmem AES-256-CBC.

Przykład:

```text
facebook123
↓
a83bf29a6d...
```

Dzięki temu nie są przechowywane w postaci jawnej.

---

## Token autoryzacyjny

Po zalogowaniu użytkownik otrzymuje token.

Token jest wymagany przy wykonywaniu operacji na danych.

Przykład:

```http
Authorization: abc123xyz
```

---

# Autor

Projekt wykonany w celach edukacyjnych jako backend aplikacji Password Manager.
