const path = require('path'),
  {readdir, stat} = require('fs/promises'),
  { stdout } = process,
  goalFolder = path.join(__dirname, 'secret-folder');

(async function checkFiles() {
  try {
    const files = await readdir(goalFolder, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isFile()) {
        outInfo(file);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
})();

async function outInfo(file) {
  const getName = file.name.split('.');
  const name = getName[0];
  const ext = path.extname(file.name).slice(1);
  let size = '';
  try {
    const pathFile = path.join(__dirname, `secret-folder/${file.name}`);
    const statFiles = await stat(pathFile);
    size = (statFiles.size / 1024).toFixed(3) + 'kb';
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  stdout.write(`${name} - ${ext} - ${size}\n`);
}




// async function getInfo(file) {
  
// }
// async function getSizeFiles() {
//   try {
//     const files = await fsPromises.readdir(goalFolder);
//     for (const file of files) {
//       const pathFile = path.join(__dirname, `secret-folder/${file}`);
//       const statFiles = await fsPromises.stat(pathFile);
//       if (statFiles.isFile()) {
//         console.log(file);
//       }
//     }
//     console.log(files);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
