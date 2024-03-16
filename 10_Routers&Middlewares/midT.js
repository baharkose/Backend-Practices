const express = require('express');
const app = express();

// Middleware 1
app.use((req, res, next) => {
  console.log(1);
  next();
});

// Middleware 2
app.use((req, res, next) => {
  console.log(2);
  // 2. middleware'yi atlamak için next('route') kullanılır
  next('route');
});

// Middleware 3
app.use((req, res, next) => {
  console.log(3);
  next();
});

// Middleware 4
app.use((req, res, next) => {
  console.log(4);
  // Son middleware'den sonra herhangi bir sonraki işlem olmayacağı için burada response gönderilebilir.
  res.send('Middleware işlemi tamamlandı.');
});

app.listen(3000, () => {
  console.log('Server çalışıyor...');
});
