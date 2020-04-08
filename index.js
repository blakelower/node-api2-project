  
const express = require('express');
const postRoute = require('./data/routes/postRoutes');
const server = express();

server.use(express.json());

const port = 5000;

server.use('/api' , postRoute);

server.get('/' , (req, res) => {
    res.send(`
        <h2>Posts API Project</h2>
        <p>Welcome to the API, read the README to get started</p>
    `);
});

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});