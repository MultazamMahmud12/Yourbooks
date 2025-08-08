const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000; 
const cors= require('cors');
require('dotenv').config()

//middlewares

app.use(express.json());
app.use(cors({
  origin : ['http://localhost:5173'],
  credentials: true
}));

//routes
const bookRoutes = require('./books/book.route.js');
const userRoutes = require('./users/user.route.js'); 
const adminRoutes = require('./stats/admin.route.js');
app.use("/api/books",bookRoutes)  
app.use("/api/orders",require('./orders/order.route.js')); //order route
app.use("/api/auth",userRoutes); 
app.use("/api/admin",adminRoutes) ;
async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.use('/',(req,res)=> {
    res.send('Bookstore server is running'); 
});
}

main().then(()=> console.log("Mongodb connect successfully! ")).catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

