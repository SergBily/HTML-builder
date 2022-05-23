const path = require('path'),
  fs = require('fs'),
  readLine = require('readline'),
  currentPath = path.join(__dirname, 'welcome.txt'),
  { stdin, stdout } = process;
fs.createWriteStream(currentPath);
const rl = readLine.createInterface({
  input: stdin,
  output: stdout,
  prompt: 'Type me message! '
});

rl.prompt();

rl.on('line', (input) => {
  if (input === 'exit') {
    exit();
  } else {
    fs.appendFile(currentPath, ` ${input}`, err => {
      if (err) throw stdout.write(err.message);
    });
  }
}).on('SIGINT', () => {
  exit();
});

function exit() {
  rl.write('\nGoodbye my friend!');
  rl.close();
}


