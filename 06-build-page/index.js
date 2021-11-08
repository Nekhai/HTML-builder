const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) throw err;
});

fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
  if (err) throw err; 
});
fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err) => {
  if (err) throw err;

  function writeHtml() {
    fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', (err, data) => {
      if (err) throw err;
      let searchString = data.search(/([{{])(?:(?=(\\?))\2.)*?\1/);
      if (searchString !== -1) {
        let mySubString = data.substring(
          data.lastIndexOf("{{") + 2, 
          data.lastIndexOf("}}")
        );
        fs.exists(path.join(__dirname, 'components', `${mySubString}.html`), function(exists) { 
          if (exists) { 
            fs.readFile(path.join(__dirname, 'components', `${mySubString}.html`), 'utf-8', (err, val) => {
              if (err) throw err;
              let newTegText = data.replace(`{{${mySubString}}}`, val);
              fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), newTegText, 'utf-8', (err) => {
                if (err) throw err;
              })
            })
          } else {
            let newTegText = data.replace(`{{${mySubString}}}`, mySubString);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), newTegText, 'utf-8', (err) => {
              if (err) throw err;
            })
          }
        }); 
        writeHtml();
      }
    })   
  }
  writeHtml();
})

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, items) => {
  if (err) throw err;
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
    if (err) throw err;
  })
  items.forEach(item => {
    const fileInfo = path.parse(path.join(__dirname, 'styles', item.name));
    if (item.isFile() && fileInfo.ext === ".css") {
      const stream = fs.createReadStream(path.join(__dirname, 'styles', item.name), 'utf-8');
      let data = '';
      stream.on('data', chunk => data += chunk);
      stream.on('end', () => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
          if (err) throw err;
        })
      });
    }
  })
});

fs.rm(path.join(__dirname, 'project-dist', 'assets'), { recursive: true, force: true }, (err) => {
  if (err) throw err;
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
    if (err) throw err;
  });
  fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, items) => {
    if (err) throw err;
    items.forEach(item => {
      if (item.isDirectory()) {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item.name), {recursive: true}, (err) => {
          if (err) {
            throw err;
          } else {
            fs.readdir(path.join(__dirname, 'assets', item.name), {withFileTypes: true}, (err, elements) => {
              if (err) throw err;
              elements.forEach(el => {
                if (el.isFile) {
                  fs.copyFile(path.join(__dirname, 'assets', item.name, el.name), path.join(__dirname, 'project-dist', 'assets', item.name, el.name), (err) => {
                    if (err) throw err;
                  })
                }
              })
            })
          }
        });
      } else {
        fs.copyFile(path.join(__dirname, 'assets', item.name), path.join(__dirname, 'project-dist', 'assets', item.name), (err) => {
          if (err) throw err;
        })
      }
    })
  });
});
