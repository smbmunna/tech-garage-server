const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json())

//user cred
//techshopmaster
//Ka1MIivLHlcNsAyZ
const uri = "mongodb+srv://techshopmaster:Ka1MIivLHlcNsAyZ@cluster0.cfuzedb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //brands collection
        const database= client.db('mobileDB');
        const brandCollection= database.collection('brands');
        const productCollection= database.collection('products');


        //apis for brand data
        app.post('/brands', async(req, res) => {
            const brand = req.body;
            console.log(brand);            
            const result= await brandCollection.insertOne(brand);
            res.send(result);
        });
        //get all brands
        app.get('/brands', async(req, res)=>{
            const cursor= brandCollection.find();
            const result= await cursor.toArray();
            res.send(result);
        })
        //get all products of a specific brand
        app.get('/brand/:brand', async (req, res)=>{
            const brand= req.params.brand;
            const query= {brand:brand };
            const result= await productCollection.find(query).toArray();
            res.send(result);
        })

        //apis for product data

        //insert product
        app.post('/products', async(req,res)=>{
            const product= req.body;
            console.log(product);
            const result= await productCollection.insertOne(product);
            res.send(result);
        })
        // find one product with id
        app.get('/details/:id', async(req,res)=>{
            const id= req.params.id;            
            const query= {_id: new ObjectId(id)};
            const result= await productCollection.findOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);




app.get('/', async (req, res) => {
    res.send('Tech Garage server has started.');
})

app.listen(port, () => {
    console.log(`Server is running on Port:${port}`)
})