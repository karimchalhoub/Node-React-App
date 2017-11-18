const express = require('express');
const app = express(); //app object represents the underlying running express server

// get http method is for getting info
// post http method is for sending info
// put http method is for update all properties of something
// delete http method is for deleting info
// patch http method is for update one or two properties of something
app.get('/', (req, res) => {
  //req represents the incoming request / res is response
  res.send({ hi: 'there' });
});

// Environment variable that is running in underlying runtime
const PORT = process.env.PORT || 5000;
app.listen(PORT);
