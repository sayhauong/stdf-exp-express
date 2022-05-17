import express from "express";
import got from "got";
import bodyParser from "body-parser";
import stdf from "stdfjs";
import bz2 from "unbzip2-stream";
import fs from "fs";
import * as url from 'url';
// const express = require("express");
// const bodyParser = require("body-parser");

// const stdf = require('stdfjs');
// const got = require('got');
// const bz2 = require('unbzip2-stream');
// const fs = require('fs');
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

let stdfbz2 = got.stream(
  'https://sourceforge.net/p/freestdf/libstdf/ci/master/tree/tests/stdf.bz2?format=raw'
)
// the demo file is in bzip2 format, so pipe it to decompress
// let rs = stdfbz2.pipe(bz2())
let rs = fs.createReadStream(__dirname+"public/data/nxp_test.stdf");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2;
 console.log(stdfbz2);
  let parser = stdf
    .parser()
    .on('rec', r => {
      console.log('%j', r)
    })
    .on('part', p => {
      console.log('%j', p)
    })

  rs.on('data', ck => {
    parser.push(ck)
  console.log("on data");
  }).on('end', () => {
    parser.push()
  })

 var singleRec;
  for (singleRec in parser){
    console.log(singleRec);
  }
  res.send("parsing is done" );
});

app.listen(3000, function(){
  console.log("server started");
});
