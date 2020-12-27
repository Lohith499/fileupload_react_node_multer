const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const customer =require("./schema/customer");
const multer =require("multer");
const path =require('path');

route.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome to Home API", host : process.env.DB_HOST });
});


route.get("/customers", async(req, res, next) => {
    const customerList = await customer.find({ });
    try {
      res.send(customerList);
    } catch (err) {
      res.status(500).send(err);
    }
});


route.post('/newcustomer', async (req, res,next) => {
    const newCustomer = new customer(req.body);
    try {
      let x=await newCustomer.save();
       // console.log(x);
        res.status(200).json({ "message": "Succesfully Added Customer", data: x })
    } catch (err) {
      res.status(500).send(err);
    }
  });


  route.post('/fileupload', async (req, res,next) => {

    let  storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `public`)
      },
      filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
      }
    })

    let upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err) {
      if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
        return res.status(500).json({"error" :err})
      }
      return res.status(200).json({"status" : "File Upload successful"})
      // Everything went fine.
    })

  });



module.exports = route;