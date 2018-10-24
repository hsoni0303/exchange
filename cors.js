const port = (process.argv.length > 2) ? parseInt(process.argv[2], 10) : 8080; // default
require('cors-anywhere').createServer().listen(port, 'localhost');
