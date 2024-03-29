// // "use strict";
// // /* -------------------------------------------------------
// //     NODEJS EXPRESS | CLARUSWAY FullStack Team
// // ------------------------------------------------------- */
// // // Auth Controller:

// // const User = require("../models/user");
// // const Token = require("../models/token");
// // const passwordEncrypt = require("../helpers/passwordEncrypt");
// // const jwt = require("jsonwebtoken");

// // module.exports = {
// //   login: async (req, res) => {
// //     /*
// //             #swagger.tags = ["Authentication"]
// //             #swagger.summary = "Login"
// //             #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
// //             #swagger.parameters["body"] = {
// //                 in: "body",
// //                 required: true,
// //                 schema: {
// //                     "username": "test",
// //                     "password": "aA?123456",
// //                 }
// //             }
// //         */

// //     const { username, email, password } = req.body;

// //     if ((username || email) && password) {
// //       const user = await User.findOne({ $or: [{ username }, { email }] });

// //       if (user && user.password == passwordEncrypt(password)) {
// //         if (user.isActive) {
// //           /* SIMPLE TOKEN */

// //           let tokenData = await Token.findOne({ userId: user.id });

// //           if (!tokenData)
// //             tokenData = await Token.create({
// //               userId: user.id,
// //               token: passwordEncrypt(user.id + Date.now()),
// //             });

// //           /* SIMPLE TOKEN */

// //           /* JWT */
// //           // kullanıcıya iki anahtar göndereceğiz. 1 accessToken 2 refreshToken
// //           //   we will send two key : 1 accessToken 2 refreshToken

// //           const accessInfo = {
// //             key: process.env.ACCESS_KEY,
// //             // kısa ömürlü olan, kritik datalar - short life critical datas

// //             time: "30m", // 30minute
// //             data: {
// //               id: user.id,
// //               username: user.username,
// //               email: user.email,
// //               password: user.password,
// //               isActive: user.isActive,
// //               isAdmin: user.isAdmin,
// //             },
// //           };

// //           const refreshInfo = {
// //             key: process.env.REFRESH_KEY,

// //             // daha uzun ömürlü - long life uncritical datas
// //             time: "3d", //3 day
// //             data: {
// //               //   username: user.username, bunu da vermeyeleim id verelim
// //               id: user.id,
// //               password: user.password, // encyrtpted
// //             },
// //           };

// //           //   30 dk süreli accessDatası accesskey ile bir tokena dönüştürüldü. İmzalama işlemi, ilk veri data, ikinci veri key, üçüncü veri süre. Üçüncü parametre aslında ayarlar işlemi
// //           const accessToken = jwt.sign(accessInfo, accessInfo.key, {
// //             expiresIn: accessInfo.time,
// //           });

// //           const refreshToken = jwt.sign(refreshInfo, refreshInfo.key, {
// //             expiresIn: refreshInfo.time,
// //             // expiresIn stringde olabilir olmayabilirde
// //           });

// //           res.status(200).send({
// //             error: false,
// //             token: tokenData.token,

// //             bearer: {
// //               access: accessToken,
// //               refresh: refreshToken,
// //             },
// //             user,
// //           });
// //         } else {
// //           res.errorStatusCode = 401;
// //           throw new Error("This account is not active.");
// //         }
// //       } else {
// //         res.errorStatusCode = 401;
// //         throw new Error("Wrong username/email or password.");
// //       }
// //     } else {
// //       res.errorStatusCode = 401;
// //       throw new Error("Please enter username/email and password.");
// //     }
// //   },

// //   logout: async (req, res) => {
// //     /*
// //             #swagger.tags = ["Authentication"]
// //             #swagger.summary = "simpleToken: Logout"
// //             #swagger.description = 'Delete token key.'
// //         */

// //     const auth = req.headers?.authorization; // Token ...tokenKey...
// //     const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']
// //     const result = await Token.deleteOne({ token: tokenKey[1] });

// //     res.send({
// //       error: false,
// //       message: "Token deleted. Logout was OK.",
// //       result,
// //     });
// //   },
// // };

// "use strict";
// /* -------------------------------------------------------
//     NODEJS EXPRESS | CLARUSWAY FullStack Team
// ------------------------------------------------------- */
// // Auth Controller:

// const User = require("../models/user");
// const Token = require("../models/token");
// const passwordEncrypt = require("../helpers/passwordEncrypt");
// const jwt = require("jsonwebtoken");

// module.exports = {
//   login: async (req, res) => {
//     /*
//             #swagger.tags = ["Authentication"]
//             #swagger.summary = "Login"
//             #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
//             #swagger.parameters["body"] = {
//                 in: "body",
//                 required: true,
//                 schema: {
//                     "username": "test",
//                     "password": "aA?123456",
//                 }
//             }
//         */

//     const { username, email, password } = req.body;

//     if ((username || email) && password) {
//       const user = await User.findOne({ $or: [{ username }, { email }] });

//       if (user && user.password == passwordEncrypt(password)) {
//         if (user.isActive) {
//           /* SIMPLE TOKEN */

//           let tokenData = await Token.findOne({ userId: user.id });

//           if (!tokenData)
//             tokenData = await Token.create({
//               userId: user.id,
//               token: passwordEncrypt(user.id + Date.now()),
//             });

//           /* SIMPLE TOKEN */

//           /* JWT */

//           const accessInfo = {
//             key: process.env.ACCESS_KEY,
//             time: "30s",
//             data: {
//               id: user.id,
//               username: user.username,
//               email: user.email,
//               password: user.password,
//               isActive: user.isActive,
//               isAdmin: user.isAdmin,
//             },
//           };

//           const refreshInfo = {
//             key: process.env.REFRESH_KEY,
//             time: "3d",
//             data: {
//               id: user.id,
//               password: user.password, // encrypted password
//             },
//           };

//           // jwt.sign(access_data, access_key, { expiresIn: '30m' })
//           const accessToken = jwt.sign(accessInfo.data, accessInfo.key, {
//             expiresIn: accessInfo.time,
//           });
//           const refreshToken = jwt.sign(refreshInfo.data, refreshInfo.key, {
//             expiresIn: refreshInfo.time,
//           });

//           /* JWT */

//           res.status(200).send({
//             error: false,
//             token: tokenData.token,
//             bearer: {
//               access: accessToken,
//               refresh: refreshToken,
//             },
//             user,
//           });
//         } else {
//           res.errorStatusCode = 401;
//           throw new Error("This account is not active.");
//         }
//       } else {
//         res.errorStatusCode = 401;
//         throw new Error("Wrong username/email or password.");
//       }
//     } else {
//       res.errorStatusCode = 401;
//       throw new Error("Please enter username/email and password.");
//     }
//   },

//   refresh: async (req, res) => {
//     /*
//      #swagger.tags = ["Authentication"]
//            #swagger.summary = "JWT: Refresh"
//            #swagger.description = 'Refresh token.'
//     */

//     const refreshToken = req.body?.bearer?.refresh;
//     if (refreshToken) {
//       // tokenı çöz, key ile
//       const refreshData = await jwt.verify(
//         refreshToken,
//         process.env.REFRESH_KEY
//       );

//     //   token doğru, kullanıcı id ve paralo dbde check ettiğimde okyse yeni bir access token ver.

//       if (refreshData) {
//         // data geldiyse, refresh data içinde gelen idye sahip kullanıcı var mı yok mu git bul. eğer bu kullanıcı varsa
//         const user = await User.findOne({ _id: refreshData.id });
//         if(user && user.password == refreshData.password){
//             res.status(200).send({
//                 error:false,
//                 // process env ile şifrele ve 30 dakika olarak onu güncelle
//                 bearer:{

//                 }

//             })
//         }
//         // kullanıcı var mı ve password doğru ise kullanıcıya yeni bir access ver.
//       } else {
//         res.errorStatusCode = 401;
//         throw new Error("JWT refresh data is wrong");
//       }
//       console.log(refreshData);
//     } else {
//       res.errorStatusCode = 401;
//       throw new Error("Please enter token.refresh");
//     }
//   },

//   //   çalışması için route yapmamaız lazım
//   logout: async (req, res) => {
//     /*
//             #swagger.tags = ["Authentication"]
//             #swagger.summary = "simpleToken: Logout"
//             #swagger.description = 'Delete token key.'
//         */

//     const auth = req.headers?.authorization; // Token ...tokenKey...
//     const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']
//     const result = await Token.deleteOne({ token: tokenKey[1] });

//     res.send({
//       error: false,
//       message: "Token deleted. Logout was OK.",
//       result,
//     });
//   },
// };

"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */

    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          /* SIMPLE TOKEN */

          let tokenData = await Token.findOne({ userId: user.id });

          if (!tokenData)
            tokenData = await Token.create({
              userId: user.id,
              token: passwordEncrypt(user.id + Date.now()),
            });

          /* SIMPLE TOKEN */

          /* JWT */

          const accessInfo = {
            key: process.env.ACCESS_KEY,
            time: process.env.ACCESS_EXP || "30s",
            data: {
              id: user.id,
              username: user.username,
              email: user.email,
              password: user.password,
              isActive: user.isActive,
              isAdmin: user.isAdmin,
            },
          };

          const refreshInfo = {
            key: process.env.REFRESH_KEY,
            time: "3d",
            data: {
              id: user.id,
              password: user.password, // encrypted password
            },
          };

          // jwt.sign(access_data, access_key, { expiresIn: '30m' })
          const accessToken = jwt.sign(accessInfo.data, accessInfo.key, {
            expiresIn: accessInfo.time,
          });
          const refreshToken = jwt.sign(refreshInfo.data, refreshInfo.key, {
            expiresIn: refreshInfo.time,
          });

          /* JWT */

          res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: {
              access: accessToken,
              refresh: refreshToken,
            },
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "JWT: Refresh"
            #swagger.description = 'Refresh token.'
        */

    const refreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      const refreshData = await jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY
      );
      // console.log(refreshData)

      if (refreshData) {
        const user = await User.findOne({ _id: refreshData.id });

        if (user && user.password == refreshData.password) {
          res.status(200).send({
            error: false,
            bearer: {
              access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
                expiresIn: process.env?.REFRESH_EXP || "30m",
              }),
            },
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("Wrong id or password.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("JWT refresh data is wrong.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter bearer.refresh");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

    const auth = req.headers?.authorization; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    if (tokenKey[0] == "Token") {
      const result = await Token.deleteOne({ token: tokenKey[1] });
      res.send({
        error: false,
        message: "Token deleted. Logout was OK.",
        result,
      });
    } else {
      // jwt ile gelmişse yapılması gereken bir işlem yok demektir.
      res.send({
        error: false,
        message: "JWT: No need any process for logout.",
      });
    }
  },
};
