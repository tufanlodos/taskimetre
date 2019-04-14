const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); //express in bir fn u olan static ile public klasörü altında css,js leri topladık. staticler için nerden bakacağını söyledik.

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res)=>{
  console.log(req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.emailadr;
  let data = {
    members: [
      {email_address: email,status:"subscribed",merge_fields:{FNAME:firstName,LNAME:lastName}}] //members array olsun dedi mailchimp. her seferinde tek adam almasak bu array e birden fazla object de koyabilirdik. merge_fields altına da mailchimb in izin verdiği şekilde girdiler verdik. merge fiels e biz de key ekleyebiliriz site üzerinden, isteği de buna göre yapabiliriz.
  };
  var jsonData = JSON.stringify(data);

  let options={
    url: "https://us20.api.mailchimp.com/3.0/lists/listnumberolusan",
    method:'post',
    headers:{ 
      "Authorization":"mertc1 9a3d83f0e0b3dfd58c7a0abf46313025-us20" ////basic Http authorization yöntemi için request modülünün sunduğu çözüm headers key inin içinde yazmak. mailchimp, basic http auth kabul ediyordu. mertc1 kısmına istediğimizi yazabileceğimiz doc ta vardı, ikinci şey api key
    },
    body: jsonData //request modülü post,put vb. işler için datanın body key i içinde gitmesini ister.
  }
  request(options,(error,response,body)=>{
    if (error) {
      res.send("There was an error with signin up, please try again!");
    }else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  })
})
app.post("/failure",function(req,res){
  res.redirect("/"); // root un get metodu var olduğu için çalıştı.
})
app.listen(process.env.PORT || 4000);

// 9a3d83f0e0b3dfd58c7a0abf46313025-us20