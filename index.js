const express = require("express");

const Posts = require("./data/seeds/01-posts");

const server = express();

server.use(express.json())


//POST
server.post('/api/posts', (req, res) => {
    Posts.add(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    })
})

server.listen(4000, () => {
    console.log("Server Running")
})