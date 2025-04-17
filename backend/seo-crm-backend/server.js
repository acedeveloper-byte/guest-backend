const express = require('express');
const router = require('./src/routes/blogsrouter');
const bodyParser = require('body-parser');
const siterouter = require('./src/routes/sitesroutes');
const authrouter = require('./src/routes/authroutes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('./src/config/dbconnect');

app.use(bodyParser.json());
app.use(cors());
app.use('/blog', router);
app.use('/sites', siterouter);
app.use('/auth/v1', authrouter);

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

/* http://localhost:5000/blog/get-all-blogs */
