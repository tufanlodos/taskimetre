const express = require('express');
const bodyParser = require('body-parser');
const mathDec = require('decimal.js');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

let baslikDurumu="Yolculuğunuzu hesaplayın!";

app.get("/",(req,res)=>{
  res.render('index',{baslik:baslikDurumu});
});

app.post("/",(req,res)=>{
  console.log(req.body);
  let km = req.body.km;
  let performans = req.body.performans;
  let yakıt = req.body.yakit;
  let ara1 = mathDec.mul(km,performans);
  let ara2 = mathDec.div(ara1,100);
  let sonuc = mathDec.mul(ara2,yakıt);
  baslikDurumu= km + " km için " + performans + " litre/100km performans ve " + yakıt + " TL yakıt fiyatıyla bu yolculuk " + sonuc.toFixed(2) + " TL olarak hesaplandı. Yeni hesap yapabilirsiniz.";
  res.redirect("/");
});

app.listen(process.env.PORT || 4000);

// 9a3d83f0e0b3dfd58c7a0abf46313025-us20