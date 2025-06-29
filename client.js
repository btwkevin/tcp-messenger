import net from 'node:net'
const serverIpAddr = '192.168.1.6';  // Replace with your public IP to enable remote chat

const socket = net.createConnection({ port: 3000, host: serverIpAddr })

process.stdin.on('data', (input) => {
    socket.write(input)
})

socket.on('data', (chunk) => {
    console.log(chunk.toString());
})

socket.on('error', (err) => {
    console.error('❌ Connection error:', err.message);
    process.exit(1)
})

socket.on('end', () => {
    console.log('Disconnected from server.');
    process.exit(0);
});