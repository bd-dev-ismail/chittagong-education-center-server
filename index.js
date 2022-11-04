const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
//midlewares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nbna82s.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
        const bookCollection = client.db("eduCenterCtg").collection("books");

        app.get('/books', async(req, res)=>{
            const query = {};
            const cursor = bookCollection.find(query);
            const count = await bookCollection.estimatedDocumentCount();
            const books = await cursor.toArray();
            res.send({count ,books})
        })
    }
    finally{

    }
}
run().catch(error=> console.log(error));




app.get('/', (req, res)=> {
    res.send('Edu Center Ctg server is running!')
});
app.listen(port, ()=>{
    console.log(`Edu center ctg server is running on ${port} port!`);
})