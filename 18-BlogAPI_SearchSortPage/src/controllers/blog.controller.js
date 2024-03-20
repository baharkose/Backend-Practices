"use strict";
/* ====================================================== */
/*                     BLOG API CONTROLLERS               */
/* ====================================================== */

require("express-async-errors");

const { BlogCategory, BlogPost } = require("../models/blog.model");

// module.exports={
//     "key":"value",
//     "key2":"value",

// }
// module.exports.key:"value"
// module.exports.key2:"value"

module.exports.BlogCategory = {
  list: async (req, res) => {
    // const data = await BlogCategory.find()
    const data = await res.getModelList(BlogCategory);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(BlogCategory),
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    const newdata = await BlogCategory.findOne({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogPost = {
  list: async (req, res) => {
    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    // ? filtreleme = bu var mı gibi bak. İçine bak

    // FILTERING:
    // URL?filter[key1]=value1&filter[key2]=value2

    // req.queryden filterı al veri gelmezse boş obje getir.
    const filter = req.query?.filter || {};
    // const filter = req.query?.filter || {};
    // console.log(filter)
    // console.log(req.query);
    // console.log(filter);

    // SEARCHING:
    // URL?search[key1]=value1&search[key2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // * req.query'den varsa searchi al yoksa boş bir obje getir.
    const search = req.query?.search || {};

    //!search'i for döngüsü içerisine soktuk.
    //? { title: 'test', content: 'test' } -> { title: { $regex: 'test' }, content: { $regex: 'test' } }

    // bu şekilde gelen veri bizim işimize yaramıyor ne yapmamız lazım. Bunu regex olarak yazmış olmamız lazım. Searchin her bir keyini, key nerden geliyor ilk değer title, content vs.

    // for (let key in search) {
    //   // ? search, searchten bana obje olarak title ve content geliyor bende ne yapıyorum for ile  key datasını regexe eşitle.
    //   // ! burada regexin görevi şu ifadeyi yani test data içerisinde içerip içermemesine göre arar.
    //   // search["title"] = { $regex: search["title"] };
    //   // search["content"] = { $regex: search["content"] };
    //   // search[key] = { $regex: search[key] };
    //   search[key] = { $regex: search[key], $options: "i" }; // i: insensitive
    // }

    // ! string hatasını çözmek için, searchkeyin string olup olmama durumunu kontrol ettik.

    let searchCopy = {};
    for (let key in search) {
      if (typeof search[key] === "string") {
        // Yalnızca string değerler için
        searchCopy[key] = { $regex: search[key], $options: "i" };
      } else {
        // String olmayan değerleri doğrudan kopyala
        searchCopy[key] = search[key];
      }
    }

    // `searchCopy` nesnesini kullanarak sorgunuzu yapın

    // console.log(search);

    // SORTING:
    // URL?sort[key1]=asc&sort[key2]=desc
    // 1: A-Z - -1: Z-A // deprecated
    // asc: A-Z - desc: Z-A
    // req.query'den sortu getir ve eğer yoksa onu boş bir obje olarak kabul et.
    // const sort = req.query?.sort || {}
    const sort = req.query?.sort || {};
    // console.log(sort);

    // const data = await BlogPost.find({
    //   title: { $regex: "text" },
    //   options: "i",
    // });
    // console.log(data);

    // PAGINATION:
    // URL?page=3&limit=10

    // // Limit:
    // let limit = Number(req.query?.limit);
    // limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);
    // console.log("limit", limit);

    //- ne olursa olsun bunu number yap.
    let limit = Number(req.query?.limit);
    // limit eğer doğru gönderilirse onu kabul et, yoksa 20 kabul et. Sayfa limit ayarlarını nerden çağırıyoruz. env'den. ENV'deki veriler her zaman string tipindedir. O nedenle gelen veriyi sayıya çevirmeliyiz.
    // ! Limit sayfa başı kayıt sayısı
    limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);
    console.log(limit);

    console.log(data);
    // artık elimizde bir limit bilgisi var.

    // // Page:
    let page = Number(req.query?.page);
    // page = page > 0 ? page : 1;
    page = page > 0 ? page - 1 : 0;
    // backendde sayfa sayısı her zaman page - 1 olarak hesaplanmalı.
    // kullanıcı onu 1 görücek ama onu ben 0 olarak görücem peki atlama nasıl olucak?
    // page*limit
    console.log(page);

    // SKİP
    // LIMIT 10, 10 -> İlk 10 kaydı atla ve 2. 10 kaydı getir. 10. kayıttan sonra 10 kaydı getir.
    // her zaman page kaç ise 1 eksiği olması gerekir.

    let skip = Number(req.query?.skip);

    skip = skip > 0 ? skip : page * limit;

    // page 1 ise atlanacak kayıt sayısı 0, page 3 dediğimizde atlanacak kayıt sayısı 40

    const data = await BlogPost.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    // ilk 10 kaydı atla limit olanı getir.

    // let page = Number(req.query?.page);

    // // page = page > 0 ? page : 1
    // page = page > 0 ? page - 1 : 0; // Backend 'de sayfa sayısı her zmaan page-1 olarak hesaplanmalı.
    // console.log("page", page);

    // // Skip:
    // // LIMIT 20, 10
    // let skip = Number(req.query?.skip);
    // skip = skip > 0 ? skip : page * limit;
    // console.log("skip", skip);

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    // const data = await BlogPost.find({ published: true })
    // const data = await BlogPost.find(filter)
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit)

    // const data = await BlogPost.find().populate('blogCategoryId')
    // const data = await res.getModelList(BlogPost, "blogCategoryId");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(BlogPost),
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId"
    );
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);
    const newdata = await BlogPost.findOne({ _id: req.params.postId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
