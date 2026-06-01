const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3002"
}));

app.use(express.json());

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/passwords"));

app.use((req, res) => {
  res.status(404).json({ message: "Nie znaleziono endpointu" });
});

app.listen(3000, () => {
  console.log("Działa na http://localhost:3000");
});