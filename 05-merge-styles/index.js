const path = require('path'),
  {readdir, readFile, writeFile} = require('fs/promises'),
  { log } = require('console'),
  style = path.join(__dirname, 'styles'),
  project = path.join(__dirname, 'project-dist');

async function readAndCheckFolder() {
  const readFolderStyle = await readdir(style, { withFileTypes: true });
  let checkedFiles = [];

  for (const file of readFolderStyle) {
    const ext = /\.css$/;

    if (file.isFile() && file.name.match(ext)) {
      checkedFiles.push(file.name);
    }
  }
  return checkedFiles;
}

readAndCheckFolder()
  .then(async (checkedFiles) => {
    let bundle = [];
    for (const file of checkedFiles) {
      const pathFile = path.join(__dirname, `/styles/${file}`);
      const readF = await readFile(pathFile, { encoding: 'utf-8' });
      bundle.push(`${readF}\n`);
    }
    return bundle;
  })
  .then(async (bundle) => {
    const promise = writeFile(path.join(project, 'bundle.css'),
      bundle);
    await promise;
  })
  .catch(error => {
    log(`Error: ${error.message}`);
  });