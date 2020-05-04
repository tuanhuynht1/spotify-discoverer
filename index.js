const express = require('express'); 
const app = express();

// middlewares
app.use(express.json());

const apiRouter = require('./api');
app.use('/api', apiRouter); 


// run server on process.env.PORT
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(PORT));
