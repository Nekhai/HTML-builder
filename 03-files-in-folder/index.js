const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, items) => {
  if (err) {
    throw err;
  } 
  items.forEach(item => {
    if (item.isFile()) {
      const fileInfo = path.parse(path.join(__dirname, 'secret-folder', item.name));
      fs.stat(path.join(__dirname, 'secret-folder', item.name), (err, stats) => {
        if (err) {
          throw err;
        } 
        console.log(`${fileInfo.name} - ${fileInfo.ext.slice(1)} - ${stats.size/1000} kb`);
      });
    }
  })
});
