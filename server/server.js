// create express app
const exp = require('express');
const app = exp();
const path = require('path');
// connect to react app
app.use(exp.static(path.join(__dirname, '../client/build')));
// configure environment variable
require('dotenv').config();
// add body parsing middleware
app.use(exp.json());
// import APIs
const userApp = require('./APIs/user-api');
const sellerApp = require('./APIs/seller-api'); // Import seller API
const productApp = require('./APIs/product-api');
// forward req to userApp when path starts with '/user-api'
app.use('/user-api', userApp);
app.use('/seller-api', sellerApp); // Use seller API
app.use('/product-api',productApp);

app.use((req, res, next) => 
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
);
// error handler (to deal with synch errors)
app.use((err,req,res,next)=>{
   res.send({message:"error occured",payload:err.message})
})

// assign port number
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`web server listening on port ${PORT}`));