const path = require('path');
const fs = require('fs');
const { stdout } = process;
const currentPath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(currentPath, 'utf-8');
let data = '';

readStream.on('data', chunk => data += chunk);
readStream.on('end', () => stdout.write(data));
readStream.on('error', error =>  stdout(error.message));