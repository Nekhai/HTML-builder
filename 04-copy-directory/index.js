const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, (err) => {
  if (err) {
    throw err;
  } 
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
    if (err) {
      throw err;
    } 
  });

  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, items) => {
    if (err) {
      throw err;
    } 
    items.forEach(item => {
      fs.copyFile(path.join(__dirname, 'files', item.name), path.join(__dirname, 'files-copy', item.name), (err) => {
        if (err) {
          throw err;
        } 
      })
    })
  });
});


