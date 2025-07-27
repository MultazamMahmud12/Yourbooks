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
app.use("/api/books",bookRoutes)  

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

