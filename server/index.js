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

app.use(cors())


io.on('connection', (socket) => {
    console.log(`a user connected with socketId; ${socket.id}`);

    socket.on('user_joined', ({blockId}) => {
        console.log("user joined on block: ", blockId);
        socket.join(blockId);
        console.log("server joined to room: ", blockId);
        role = assignUserRole(blockId);
        console.log("user role: ", role);
        socket.emit('user-role', {role});
    });

    socket.on('code-change', ({blockId, text}) => {
        console.log("send code", text, "to blockId: ", blockId);
        io.to(blockId).emit('code-change', {text});
    });

    socket.on('disconnect', () => {
        console.log('user disconnected with socketId: ', socket.id);
    });
});


app.get("/", cors(), (req, res) => {
    res.send("Welcome to the server port!");
});

app.get('/blocks', cors(), (req, res) => {
    let blocksToReturn = Blocks;
    res.send({Blocks: blocksToReturn});
});


app.get('/blocks/:blockId', cors(), (req, res) => {
    const {blockId} = req.params
    const block = Blocks[blockId-1]
    if (!block) {
        res.status(400).json({message: 'Block not found'}).end();
        return;
    }
    res.send({block});
});

server.listen(port, () =>
    console.log(`Listening on port ${port}`)
);

const assignUserRole = (blockId) => {
    if (Blocks[blockId-1].mentorUserId === null){
        Blocks[blockId-1].mentorUserId = true;
        return "mentor"
    }
    else {
        if (Blocks[blockId-1].studentUserId === null){
            Blocks[blockId-1].studentUserId = true;
            return "student" 
        }
    }
    return "other"
}