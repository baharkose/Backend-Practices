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
  isAdmin: (req, res, next) => {},
  isLead: (req, res, next) => {},
};
