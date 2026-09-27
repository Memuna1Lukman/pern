import http from "http"

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/plain'});
    res.end("You are running a Node Backend Server")
})

server.listen(3000,()=>console.log('Server is running on port http://localhost:3000'));