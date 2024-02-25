const express = require('express');
const app = express();
const {Blocks} = require("./Blocks");
app.use(express.json());
const cors = require('cors');

const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const port = 3080;

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));


io.on('connection', (socket) => {
    console.log(`a user connected with socketId; ${socket.id}`);
    socket.on('user_joined', ({blockId}) => {
        socket.join(blockId);
        role = assignUserRole(blockId);
        socket.emit('user-role', {role});
    });

    socket.on('code-change', ({blockId, text}) => {
        io.to(blockId).emit('code-change', {text});
    });
});


app.get("/", cors(corsOptions), (req, res) => {
    res.send("Welcome to the server port!");
});

app.get('/blocks', cors(corsOptions), (req, res) => {
    let blocksToReturn = Blocks;
    res.send({Blocks: blocksToReturn});
});


app.get('/blocks/:blockId', cors(corsOptions), (req, res) => {
    const {blockId} = req.params
    const block = Blocks[blockId-1]
    if (!block) {
        res.status(400).json({message: 'Block not found'}).end();
        return;
    }
    res.send({block});
});

const assignUserRole = (blockId) => {
    if (Blocks[blockId-1].mentorUserId === null){
        Blocks[blockId-1].mentorUserId = true;
        return "mentor"
    }
    return "student"
}

server.listen(port, () =>
    console.log(`Listening on port ${port}`)
);

