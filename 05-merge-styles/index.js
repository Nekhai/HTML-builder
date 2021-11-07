const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, items) => {
  if (err) {
    throw err;
  }
  fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) {
      throw err;
    } 
  })
  items.forEach(item => {
    const fileInfo = path.parse(path.join(__dirname, 'styles', item.name));
    if (item.isFile() && fileInfo.ext === ".css") {
      const stream = fs.createReadStream(path.join(__dirname, 'styles', item.name), 'utf-8');
      let data = '';
      stream.on('data', chunk => data += chunk);
      stream.on('end', () => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
          if (err) {
            throw err;
          } 
        })
      });
    }
  })
});

