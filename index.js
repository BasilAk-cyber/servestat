const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

const PORT = 3000;

let folder = process.argv[2];
const fileExist = fs.existsSync(folder);

if (!folder || !fileExist){
    console.error(chalk.red.bold('❌ ERROR: ') + chalk.white('Folder is not valid'));
    return;
}

console.log(`Server will serve files from: ${path.resolve(folder)}`);



const serveFile = async (filepath, response, contentType) => {

    try {

        const rawData = await fsPromises.readFile(filepath, 'utf8');

        response.writeHead(200, {'Content-Type': contentType});
        response.end(rawData);

        console.log(chalk.green('   ✓ Served: ') + chalk.gray(filepath));
        
    } catch (error) {
        console.error(error);
        response.statusCode = 404;
        response.end();
    }

}

const server = http.createServer( async (req, res) => {

    console.log(chalk.blue.bold('\n📨 Incoming Request  '));
    console.log(`${chalk.gray('   Method: ')}  ${chalk.cyan.italic(req.method)}`);
    console.log(chalk.gray('   URL:    ') + chalk.cyan.italic(req.url));

    let requestedPath = req.url;
    requestedPath = requestedPath.split('?')[0];

    let filePath = path.join(__dirname, folder, requestedPath);

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

   
    try {

         const stats = await fsPromises.stat(filePath);

        let contentType;
        if (stats.isDirectory()) {
            console.log(chalk.green(`  → Directory detected, looking for index.html`));
            filePath = path.join(filePath, 'index.html');
            contentType = "text/html";
            await serveFile(filePath, res, contentType);
        }else{
            const extName = path.parse(filePath).ext.toLowerCase();

            contentType = contentTypes[extName] || 'application/octet-stream' ;
            console.log(contentType);
            await serveFile(filePath, res, contentType);
        }


    } catch (error) {
        console.error(chalk.red(`✗ Not found: ${filePath}`));
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
    }

});

server.listen(PORT, () => {
    console.log(`${chalk.green.bold.italic('🚀 Server running ')}  ${chalk.blue.underline(`on http://localhost:${PORT}`)}`)
    console.log(`${chalk.white('📁 Serving files from: ')}   ${chalk.yellow(`${path.resolve(folder)}`)}`)
    console.log(`${chalk.gray('  Press Ctrl+C to stop the server\n')}`);
});