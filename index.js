const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const PORT = 3000;

let filename = process.argv[2];
const fileExist = fs.existsSync(filename);

if (!filename || !fileExist){
    console.error("File is not valid");
}


const filePath = path.join(__dirname, filename);



const serveFile = async (filepath, contentType, response) => {

    try {
        const rawData = await fsPromises.readFile(filepath, 'utf8');

        response.writeHead(200, {'Content-Type': contentType});
        response.end(rawData);
        
    } catch (error) {
        console.error(error);
        response.statCode;
        response.end();
    }

}

const server = http.createServer((res, req) => {

    const extName = path.parse(filePath).ext.toLowerCase();

    const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.htm' : 'text/html; charset=utf-8',
        '.css' : 'text/css; charset=utf-8',
        '.js'  : 'text/javascript; charset=utf-8',
        '.json': 'application/json',
        '.png' : 'image/png',
        '.jpg' : 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif' : 'image/gif',
        '.svg' : 'image/svg+xml',
        '.pdf' : 'application/pdf',
        '.wasm': 'application/wasm',
        '.webp': 'image/webp',
        '.ico' : 'image/x-icon',
        '.txt' : 'text/plain; charset=utf-8',
    };
    let contentType = contentTypes[extName];

    serveFile(filePath, contentType, res);


});

server.listen(PORT, () => {
    console.log(`Server runnng on port ${PORT}`);
});