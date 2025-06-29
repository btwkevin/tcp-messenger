import net from 'node:net'

const clientList = []
const server = net.createServer(socket => {
    clientList.push(socket)
    console.log(clientList.length)

    socket.on('data', (chunk) => {
        console.log(chunk.toString());
        clientList.forEach(socket => {
            socket.write(chunk)
        })
    })

    socket.on('end', () => {
        console.log(`Client Disconnected ${socket.remoteAddress}`);
    })

    socket.on('error', (err) => {
        console.error(`⚠️ Socket error with ${socket.remoteAddress}:${socket.remotePort} - ${err.message}`);
    });
    console.log(`Client Connected : ${socket.remoteAddress}`);
})

const PORT = 3000
server.listen({ port: PORT }, () => console.log(`Server listening on port ${PORT}`))