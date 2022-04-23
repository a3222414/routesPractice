'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

const postsDataJson = fs.readFileSync(
  `${__dirname}/data/data.json`,
  'utf8',
  (err, data) => {
    console.log('getting posts data');
  }
);
const postsData = JSON.parse(postsDataJson); //Array
console.log(postsData);

// functions
const getAllPosts = (req, res) => {
  console.log('received get posts request!👻');
  res.status(200).json({
    status: 'success',
    data: postsData,
  });
};
const getPersonalPost = (req, res) => {
  const id = req.params.id * 1; // Number
  const user = postsData[id - 1];
  console.log(`received get personal post request!👻 id: ${id}`);
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'Personal Post Not Found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: postsData[id - 1],
  });
};
const createNewPost = (req, res) => {
  // create a format on data
  const newID = postsData.length + 1; //
  const newData = Object.assign({ id: newID }, req.body); //左邊值可以直接用變數
  console.log(`Create a new post on id: ${newID}`);

  postsData.push(newData); // arrays
  fs.writeFile(
    `${__dirname}/data/data.json`,
    JSON.stringify(postsData),
    (err, data) => {
      console.log('Overwrited data.json file');
      res.status(201).json({
        // create 用201
        status: 'success',
        data: newData,
      });
    }
  );
};
const updatePost = (req, res) => {
  const id = req.params.id * 1;
  console.log(`update post on ${id}`);
  res.status(200).json({
    status: 'success',
    data: {
      post: 'updated data is here!!!',
    },
  });
};

const deletePost = (req, res) => {
  const id = req.params.id * 1;
  console.log(`delete post on ${id}`);
  if (id > postsData.length) {
    console.error('!!!!!!!!!!!!!!!!cannot delete!!!!!!!!!!!!!!');
    return res.status(404).json({
      status: 'fail',
      message: 'post on id not found',
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      post: null,
    },
  });
};
// get (客戶端得到訊息)
app.get('/api/posts', getAllPosts);

// get
app.get('/api/post/:id', getPersonalPost);

// Create a post (posts)
app.post('/api/posts/', createNewPost);

// Patch  renew a post
app.patch('/api/post/:id', updatePost);

//Delete a post
app.delete('/api/post/:id', deletePost);

//create a server
const port = 8000;
app.listen(port, '127.0.0.1', () => {
  console.log(`listening on port ${port}`);
});
