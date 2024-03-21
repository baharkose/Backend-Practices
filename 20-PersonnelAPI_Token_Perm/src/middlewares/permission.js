"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

// permissionda biz yetki kontrolünü yapacağız. permissionlar bir middleware'dir.
// hangi parametre benim izin verdiğimi gösterir next()

module.exports = {
  isLogin: (req, res, next) => {
    // neden permissionda isActive tekrar check ediliyor. login olduktan sonra da masife çekilmiş olabilir.
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("No Permission: You must login");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },
  isAdminOrLead: (req, res, next) => {
    // sadece kendi departmanlarını görebilir. önce departman idsini almamız lazım. reqden id olarak gelicek veya null gelicek. bana idnin gelmesi lazım. urlden idnin urlden geldiğini biliyorum onu almam lazım. mutlaka bir id gelmeli urlden
    // giriş yapmak zorunda -aktif olmalı ve admin olmalu yada admin değilse lead true olmalı ve userın departmanid'si req.userdan gelen departmentId'ye eşit olmak zorunda
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.deparmentId == departmentId))
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "NoPermission: You must login and to be Admin or Department Lead."
      );
    }
  },
};

//+ 1 session ve cookiler tarayıcılara özgü ve güvenilirliği sıkıntılı. O nedenle token mantığı platform bağımsızlığından dolayı daha çok tercih edilir. Bana illaki tokenla gel yoksa gelme.

// + token her zaman headerda gider kullanıcı başlığı altında gider. Artık bana her işlemde loginden sonra token vermek zorunda

//+3 burada kullanıcı giriş yapmış mı, ikinci giriş yapmış ve admin mi, 3. giriş yapmışmı,  admin ya da lead mi. Eğer admin kontrolü yapmazsak iki ayrı middleware çağırmak zorunda kalıyoruz. 3 tane permission middlewarei yazdık. Şimdi bunları deneyelim...department routerı aç
