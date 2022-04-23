const fs = require('fs');

const postsDataJson = fs.readFileSync('data/data.json', 'utf8', (err, data) => {
  console.log('getting posts data');
});
const postsData = JSON.parse(postsDataJson); //Array

//middleware function
exports.checkID = (req, res, next, value) => {
  if (req.params.id * 1 > postsData.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// functions
exports.getAllPosts = (req, res) => {
  console.log('received get posts request!👻');
  res.status(200).json({
    status: 'success',
    data: postsData,
  });
};
exports.getPersonalPost = (req, res) => {
  //   const id = req.params.id * 1; // Number
  const post = postsData.find((el) => el.id === id);
  //   console.log(user);
  //   console.log(`received get personal post request!👻 id: ${id}`);
  //   if (!post) {
  //     res.status(404).json({
  //       status: 'fail',
  //       message: 'Personal Post Not Found',
  //     });
  //   }
  res.status(200).json({
    status: 'success',
    data: postsData[id - 1],
  });
};
exports.createNewPost = (req, res) => {
  // create a format on data
  const newID = postsData.length + 1; //
  const newData = Object.assign({ id: newID }, req.body); //左邊值可以直接用變數
  console.log(`Create a new post on id: ${newID}`);
  console.log(newData);
  postsData.push(newData); // arrays
  console.log(postsData);

  fs.writeFile(
    `${__dirname}/data/data.json`,
    JSON.stringify(postsData),
    (err, data) => {
      res.status(201).json({
        // create 用201
        status: 'success',
        data: newData,
      });
    }
  );
};
exports.updatePost = (req, res) => {
  const id = req.params.id * 1;
  console.log(`update post on ${id}`);
  res.status(200).json({
    status: 'success',
    data: {
      post: 'updated data is here!!!',
    },
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.id * 1;
  console.log(`delete post on ${id}`);
  //   if (id > postsData.length) {
  //     console.error('!!!!!!!!!!!!!!!!cannot delete!!!!!!!!!!!!!!');
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'post on id not found',
  //     });
  //   }

  res.status(204).json({
    status: 'success',
    data: {
      post: null,
    },
  });
};
