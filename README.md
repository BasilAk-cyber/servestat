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

### **Step 6: Publish to npm** (Optional)

If you want to publish to npm:
```powershell
# 1. Create an npm account at npmjs.com if you don't have one

# 2. Login to npm
npm login

# 3. Check if the package name is available
npm search servestat

# 4. If taken, update package.json with a unique name:
# "name": "@yourusername/servestat" or "servestat-cli"

# 5. Publish
npm publish

# If using scoped package (@yourusername/servestat)
npm publish --access public
```

---

### **Step 7: Update .gitignore**

Make sure your `.gitignore` includes:
```
node_modules/
.env
*.log
.DS_Store
npm-debug.log*
```

---

## Your Final File Structure
```
servestat/
├── cli.js              ← CLI entry point
├── index.js            ← Server logic
├── package.json        ← Package config with "bin"
├── package-lock.json
├── README.md           ← Documentation
├── .gitignore
├── node_modules/
├── public/             ← Test folder
│   ├── index.html
│   └── about.html
└── secrets/            ← For security testing
    └── config.env
```

---

## Testing Your CLI
```powershell
# 1. Install it locally for testing
npm link

# 2. Test all commands
servestat --help
servestat --version
servestat
servestat public
servestat public -p 8080

# 3. Test from a different directory
cd C:\Users\USER\Desktop
servestat C:\Users\USER\Documents\servestat\public

# 4. When satisfied, unlink
npm unlink -g servestat
```

---

## Pro Tips

### Add More CLI Options

You can extend `cli.js` with more options:
```javascript
// Add in cli.js
const args = process.argv.slice(2);

// Parse options
const options = {
    folder: args.find(arg => !arg.startsWith('-')) || 'public',
    port: 3000,
    open: false, // Auto-open browser
    cors: false, // Enable CORS
};

// --port or -p
const portIndex = args.findIndex(arg => arg === '-p' || arg === '--port');
if (portIndex !== -1) options.port = parseInt(args[portIndex + 1]);

// --open or -o
if (args.includes('--open') || args.includes('-o')) options.open = true;

// --cors
if (args.includes('--cors')) options.cors = true;
```

### Add Auto-Open Browser
```powershell
npm install open
```
```javascript
// In cli.js
const open = require('open');

if (options.open) {
    open(`http://localhost:${port}`);
}
```

---

Now you have a proper npm CLI tool! 🎉

Want to publish it to npm so others can use it? Let me know! 🚀