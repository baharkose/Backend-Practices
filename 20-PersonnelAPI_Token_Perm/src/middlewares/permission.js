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
  isLead: (req, res, next) => {
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
