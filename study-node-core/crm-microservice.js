let http = require('http');
const port = 7100;

http.createServer((req,res)=>{
    res.writeHead(200);
    let jack = {
        "identity": "11111111110",
        "fullname": "jack bauer",
        "email": "jack.bauer@example.com"
    }
    res.end(JSON.stringify(jack));
}).listen(port);
console.log(`Listening on port ${port}`);