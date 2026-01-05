const connectToMongo =require('./db');
const express = require('express')

var cors = require('cors')


connectToMongo();//db.js se connectto mango function ko callkiya
const app = express()
const port = 5000//localhost ka port
//json ko lene ke liye compulsory
app.use(express.json())

app.use(cors({
  origin: 'https://inotebookproject-seven.vercel.app', // Change this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/auth',require('./routes/auth')) //endpoint for user
app.use('/api/note',require('./routes/notes'))
app.get('/storedata',(req,res)=>{
  res.send( )
})

app.listen(port, () => {
  console.log(`Example app listening on port https://inoteproject.onrender.com/:${port}`)//demosite
})
