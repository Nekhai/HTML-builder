const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, function(err, items) {
  if (err) {
    throw err;
  } 
  items.forEach(item => {
    if (item.isFile()) {
      // console.log(item.name)
      const fileInfo = path.parse(path.join(__dirname, 'secret-folder', item.name));
      fs.stat(path.join(__dirname, 'secret-folder', item.name), function(err, stats) {
        if (err) {
          throw err;
        } 
        console.log(`${fileInfo.name} - ${fileInfo.ext.slice(1)} - ${stats.size/1000} kb`);
      });
    }
  })
});
