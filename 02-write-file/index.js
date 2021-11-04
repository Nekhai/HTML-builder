const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const stream = fs.createWriteStream(path.join(__dirname,'text.txt'));
const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js?\n', (answer) => {
  if (answer === 'exit') {
    rl.close();
  }
  stream.write(answer);
});

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else if (input !== 'exit') {
    stream.write(input);
  }
});

rl.on('close', () => {
  console.log('Goodbye')
})

