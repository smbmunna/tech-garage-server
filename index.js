const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Tech Garage server has started.');
})

app.listen(port, () => {
    console.log(`Server is running on Port:${port}`)
})