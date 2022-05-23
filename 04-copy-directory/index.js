const path = require('path'),
  {mkdir, readdir, copyFile, unlink} = require('fs/promises'),
  dirForCopy = path.join(__dirname, 'files'),
  copyDir = path.join(__dirname, 'files-copy');


(async function createDir() {
  try {
    await mkdir(copyDir, { recursive: true });
    const readDirForCopy = await readdir(dirForCopy, { withFileTypes: true });

    deleteFile();

    for (const file of readDirForCopy) {
      await copyFile(`${dirForCopy}/${file.name}`, `${copyDir}/${file.name}`);
    }
  } catch (error) {
    console.error(`Error1: ${error.mesage}`);
  } 
})();

async function deleteFile() {
  try {
    const readCopyDir = await readdir(copyDir, { withFileTypes: true });
    if (readCopyDir.length === 0) return;
    for (const file of readCopyDir) {
      unlink(`${copyDir}/${file.name}`);
    }
  } catch (error) {
    console.error(`Error2: ${error.mesage}`);
  }
}