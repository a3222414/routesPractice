'use strict';
const app = require('./app');

//create a server
const port = 8000;
app.listen(port, '127.0.0.1', () => {
  console.log(`listening on port ${port}`);
});
