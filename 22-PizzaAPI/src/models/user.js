// "use strict";
// /* -------------------------------------------------------
//     NODEJS EXPRESS | CLARUSWAY FullStack Team
// ------------------------------------------------------- */
// const { mongoose } = require("../configs/dbConnection");
// /* ------------------------------------------------------- */
// const passwordEncrypt = require("../helpers/passwordEncrypt");

// const userSchema = new mongoose.Schema(
//   {
//     // idyi otomatik, _id
//     username: {
//       type: String,
//       trim: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       trim: true,
//       required: true,
//       // validate: [
//       //   (password) =>
//       //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
//       //   "Password type is not correct.",
//       // ],
//       // madem öncelikle o çalışıyor o zaman ben de validasyonu sette yapabiliriz.
//       set: (password) => {
//         if (
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
//         ) {
//           return passwordEncrypt(password);
//         } else {
//           res.errorStatusCode = 403;
//           throw new Error("Password type is not correct");
//         }
//       },
//     },

//     email: {
//       type: String,
//       trim: true,
//       required: true,
//       unique: true,
//       validate: [
//         (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
//         "Email type is not correct.",
//       ],
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//     },
//     isAdmin: {
//       type: String,
//       default: false,
//     },
//   },
//   {
//     // genelde küçük harflerle ve çoğul
//     collection: "users",
//     // createdAt updatedAt otomatik
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("User", userSchema);

// // -> controllera

"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      // validate: [
      //     (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
      //     'Password type is not correct.'
      // ],
      // set: passwordEncrypt
      //? Yöntem-1:
      // set: (password) => {
      //     if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
      //         return passwordEncrypt(password)
      //     } else {
      //         throw new Error('Password type is not correct.')
      //     }
      // },
      //? Yöntem-2:
      set: (password) => {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
        ) {
          return passwordEncrypt(password);
        } else {
          return "wrong";
        }
      },
      validate: (password) => password != "wrong",
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Email type is not correct.",
      ],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Model:
module.exports = mongoose.model("User", UserSchema);
