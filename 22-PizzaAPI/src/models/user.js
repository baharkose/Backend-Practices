"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const passwordEncrypt = require("../helpers/passwordEncrypt");

const userSchema = new mongoose.Schema(
  {
    // idyi otomatik, _id
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      //   setİşlemleri - encrityption
      set: (password) => passwordEncrypt(password),
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: (email) => email.includes("@") && email.includes("."),
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: String,
      default: false,
    },
  },
  {
    // genelde küçük harflerle ve çoğul
    collection: users,
    // createdAt updatedAt otomatik
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// -> controllera