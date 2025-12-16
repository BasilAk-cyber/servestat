# ServeSTAT

A simple, secure static file server with built-in directory traversal protection.

## Features

- 🚀 Fast and lightweight
- 🔒 Built-in security (directory traversal protection)
- 🎨 Beautiful colored console output
- 📁 Serves any directory
- 🌐 Support for common file types (HTML, CSS, JS, images, etc.)

## Installation

### Global Installation (Recommended)

\`\`\`bash
npm install -g servestat
\`\`\`

### Local Installation

\`\`\`bash
npm install servestat
\`\`\`

## Usage

### Command Line

\`\`\`bash

# Serve a specific directory
servestat dist


# Show help
servestat -h

# Show version
servestat -v
\`\`\`

### As a Module

\`\`\`javascript
const { startServer } = require('servestat');

// Start server
startServer('public');
\`\`\`

## Examples

\`\`\`bash
# Serve a React build
servestat ./build

# Serve a Next.js static export
servestat ./out

# Serve on a different port
servestat ./dist -p 8080
\`\`\`

## Security

ServeSTAT includes built-in protection against directory traversal attacks. Requests attempting to access files outside the specified directory will be blocked with a 403 Forbidden response.

## License

MIT

## Author

Your Name
Akanifiok Basil

---



Now you have a proper npm CLI tool! 🎉

Want to publish it to npm so others can use it? Let me know! 🚀
