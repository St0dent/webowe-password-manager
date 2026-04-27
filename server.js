const express = require("express");

const app = express();
app.use(express.json());

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/passwords"));

app.listen(3000, () => {
  console.log("Działa na http://localhost:3000");
});