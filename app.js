'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
app.use(morgan('dev'));

//在http Post method 中 將客戶端傳進來的JSON格式的資料轉成ＪＳ看的懂的物件
app.use(express.json());

//每次request 會console 時間
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  req.next();
});

// 接收router
const PostRouter = require(`${__dirname}/routes/postsRoute`);
app.use('/api/posts/', PostRouter); // 接router // 相同路徑用 /api/posts/代替

module.exports = app;
