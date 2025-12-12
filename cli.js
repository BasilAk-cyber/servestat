#!/usr/bin/env node

/**
 * ServeSTAT - A simple, secure static file server
 * CLI Entry Point
 */

const { startServer } = require('./index.js');
const chalk = require('chalk');
const fs = require('fs');

const args = process.argv.slice(2);
const folder = args[0] || 'public';

const fileExist = fs.existsSync(folder);

if (fileExist){
    
    startServer(folder);
}else if (args.includes('--help') || args.includes('-h')){
    console.log(`
    ${chalk.bold.blueBright.italic("ServeSTAT - Simple Static File Server")}

    ${chalk.italic.greenBright("Usage:")}
    servestat [directory/options] 

    ${chalk.italic.greenBright("Arguments:")}
    directory          Directory to serve (default: "public")

    ${chalk.italic.greenBright("Options:")}
    -p, --port <port>  Port number (default: 3000)
    -h, --help         Show this help message
    -v, --version      Show version number

    ${chalk.italic.greenBright("Example:")}
    servestat -v               # Displays version on console
    servestat dist             # Serve dist on port 3000
        `);
        process.exit(0);
}else if (args.includes('--version') || args.includes('-v')){
    const pkg = require('./package.json');
    console.log(`${chalk.cyanBright.bold("servestat")} v${pkg.version}`);
    process.exit(0);   
}else{
    console.log(`${chalk.redBright.italic('Enter a valid command')}`)
}

