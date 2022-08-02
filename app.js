const express = require("express");
const bodyParser = require("body-parser");
const mathDec = require("decimal.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let title = "Yolculuğunuzu hesaplayın!";

app.get("/", (req, res) => {
  res.render("index", { title });
});

app.post("/", (req, res) => {
  const { km, performance, fuelCost } = req.body;
  const result = mathDec.mul(
    mathDec.div(mathDec.mul(km, performance), 100),
    fuelCost
  );
  title =
    km +
    " km için " +
    performance +
    " litre/100km performans ve " +
    fuelCost +
    " TL yakıt fiyatıyla bu yolculuk " +
    result.toFixed(2) +
    " TL olarak hesaplandı. Yeni hesap yapabilirsiniz.";
  res.redirect("/");
});

app.listen(process.env.PORT || 4000);

// 9a3d83f0e0b3dfd58c7a0abf46313025-us20
