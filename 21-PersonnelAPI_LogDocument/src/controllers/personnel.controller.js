"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personnel, {}, "departmentId");

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data,
    });
  },

  create: async (req, res) => {
    // isLead Control:
    const isLead = req.body?.isLead || false;
    if (isLead) {
      const xyz = await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false }
      );
    }

    const data = await Personnel.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Personnel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    // ! eğer gelen kişi admin değilse kendini lead yapma ve maaşını güncelleyemesin. kendi kaydını güncelleyebilir ama isLead olma ve maaş kısmını yalnızca admin değiştirebilir.
    if (!req.user.isAdmin) {
      // istersem sabit bir değer veririm istersem de direk delete ile geçersiz kılarım.
      req.body.isLead = false;
      req.body.isAdmin = false;
      //   gelen değeri iptal et geçersiz kıl
      delete req.body.isLead;
      delete req.body.salary;
    }

    update2: async (req, res) => {
      if (!req.user.isAdmin) {
        req.body.isAdmin = false;
        delete req.body.salary;
        delete req.body.isLead;
      }
    };

    // isLead Control:
    const isLead = req.body?.isLead || false;
    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await Personnel.updateMany(
        { departmentId, isLead: true },
        { isLead: false }
      );
    }

    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Personnel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
