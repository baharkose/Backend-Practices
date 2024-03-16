"use strict";
/*
    Expressjs Routing
*/
require("dotenv").config();

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";
//! büyük harfle yazma sebebimiz bunun bir sabit olduğu ve değiştirilmemsi gerektiği  bir de _ işareti bunu değiştirme demek
// metod fonksiyon farkı?
// bir classa aitse metod diğer durumlarda fonksiyon

//1 kullanabilmek için öncelikle require ettik. Node modüllerine bakar sonra globale gider bakar var mı yok mu diye?

const express = require("express");

//2 şimdi bu expressten faydalanarak bir application oluşturalım

const app = express(); // express üzerinde bir server oluşturduk

//4- hangi portu dinleyeceğimizi belirtiyoruz.

// aynı metod ismi farklı parametreler alıyor ise ne olur? overload edilmiş olur. overload aynı isimde birden fazla fonksiyon oluşturmuşuz demektir.

// 5- şimdi ilk get isteğimizi kontrol edelim
// app.METHOD(PATH, HANDLER)
// app.get("/", (req, res) => {
// böyle de çalışrır ama biz alttaki versiyonu daha çok tercih ediyoruz.
// res.write("hello")
// res.end()

//   res.write(
//     // bu işlem bizim respond send işlemimizi yapabiliyor.
//     JSON.stringify({
//       message: "hello",
//     })
//   );
//   res.end();

//   send ile yukarıdaki jsonStringfy işlemini yapmamıza gerek kalmadan direk json formatında veriyi gönderebilmemizi sağlar.
//   console.log("hello");
//   res.send({
//     message: "hello",
//   });
// });
//  böyle bırakır isek döner durur. get ne yapıyor bir send arar. node.js kullanıyor isek end kullanıyor. send aynı zamanda otomatik olarak JSON formatına verileri çevirir.

// app.post("/", (req, res) => {
//   res.send({ message: "hello" });
// });

// app.put("/", (req, res) => {
//   res.send({ message: "hello" });
// });

// app.delete("/", (req, res) => {
//   res.send({ message: "hello" });
// });

// bunları tek tek yazacak mıyız? Evet yazılmalıdır.

// bu pek tercih edilmez ama hepsinin yerine kullanılabilir. Hangi metod ile istek atılırsa atılsın çalışır. hepsinde tek işlemi görmek istiyor isek tercih edilebilir ama destenlenmediği yerler var.

// app.all("/", (req, res) => {
//   res.send({ message: "all message are send" });
// });

// o yüzden route işlemleri yaparken dikkat edilmelidir. Neden diğer işlemleri yoruma almak lazım all mesajından gelen veriyi görebilmek için. Yoksa görünmez.

// app.get('/drive1/drive2', (req,res)=>{res.send({"message":"get method called"})})

// JOKER karakterler
//ab ile başla aradaki x araya hangi karakter gelirse anlamındadir

// app.get('/ab[a-zA-Z]12', (req,res)=>{res.send({"message":"get method called"})})

// app.get(/\/*abc$/, (req, res) => {
//     res.send({ message: "hnfjhdfdjfh" });
//   });

// sonu abc ile bitenler

// 3- şimdi bir port oluşturalım ve başarılı oldu ise bir callback çağıralım
// ab* sonu ne olursa olsun demek

// regex
// iki / arasında regex kabul edilir. Belirli semboller ile koşullar koyabiliyoruz.

//? PARAMETRELERİ KULLANMA

// : üstü URL'deki bir parametre geldiğini anlar.

// app.get("/:blogId/location/:location/:izmir", (req, res) => {
//   res.send({
//     params: req.params,
//     blogId: req.params.blogId,
//     url: {
//       protokol: req.protocol,
//       domain: req.hostname,
//       method: req.method,
//       params: req.params,
//       header: req.header,
//       path: req.path,
//       body: req.body,
//       query: req.query,
//     },
//   });
// });

// id sadece rakamlar olsun istiyoruz
// app.get("/:userId[0-9]", (req, res) => {

// app.get("/:userId[\\d+]", (req, res) => { -> digit

// app.get("/:userId[\\D+]", (req, res) => { -> digit olmayan

// Body neden gelmiyor?
// bodyden alınan verileri işlemek için bir middleware'e ihtiyacımız var. Şuana ladar öğrendiklerimiz ile bodye erişmeyiz.

// app.get("/:userId[\\d+]", (req, res) => {
//   res.send({
//     params: req.params,
//     blogId: req.params.blogId,
//     body: req.body,
//     url: {
//       protokol: req.protocol,
//       domain: req.hostname,
//       method: req.method,
//       params: req.params,
//       header: req.header,
//       path: req.path,
//       query: req.query,
//     },
//   });
// });

// ? Status kodu alma işlemi

// app.get("/", (req, res) => {
//   // default 200 farklı bişey göndermediysek, send ile de içerisine mesajımızı yazıyoruz.
//   res.status(201).send({
//     message: "post method called",
//   });
// });

// app.put("/", (req, res) => {
//   res.status(202).send({ message: "put method called" });
// });
// app.delete("/", (req, res) => {
//   res.status(202).send({ message: "delete method called" });
// });

// ? redirect yönlendirme işlemi -> sadece 300lü kodlar

// app.get("/", (req, res) => {
//   // önce status kodu veriyoruz. ve nereye yönlendirme yapılacaksa eğer tam adresi vermemiz lazım. method get olmalı. ana directorye istek attığımda googlea git
//   //   301 - 302 yönlendirme status kodlarından bir tanesi

//   res.redirect(301, "https://google.com/");

//   // res.status(202).send({ message: "delete method called" });
// });
app.get("/", (req, res) => {
  //   __dirname- bulunduğumuz klasördür
  //   bulunduğum klasör içinde +
  res.send({
    message: "hello",
  });
});

// ? show file content
// hangi pathe istek geldiğinde hangi dosya görünecek.

app.get("/file", (req, res) => {
  //   __dirname- bulunduğumuz klasördür
  //   bulunduğum klasör içinde +
  console.log(__dirname);
  res.sendFile(__dirname + "index.js");
});

app.get("/download", (req, res) => {
  //   __dirname- bulunduğumuz klasördür
  //   bulunduğum klasör içinde +
  console.log(__dirname);
  res.download("readme.md", "express routing");
});

app.listen(PORT, HOST, () => {
  console.log(`server is runned http://${HOST}:${PORT}`);
});
