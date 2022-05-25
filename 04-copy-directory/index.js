const path = require('path'),
  {mkdir, readdir, copyFile, rm} = require('fs/promises'),
  dirForCopy = path.join(__dirname, 'files'),
  copyDir = path.join(__dirname, 'files-copy');

async function createDir() {
  await mkdir(copyDir, { recursive: true });
  
  const readCopyDir = await readdir(copyDir, { withFileTypes: true });

  if (readCopyDir.length > 0) {
      
    for (const file of readCopyDir) {
      await rm(`${copyDir}/${file.name}`, { force: true, recursive: true });
    }
  }
	
  const readDirForCopy = await readdir(dirForCopy, { withFileTypes: true });
  for (const file of readDirForCopy) {
    await copyFile(`${dirForCopy}/${file.name}`, `${copyDir}/${file.name}`);
  }
}

createDir()
  .catch((error) => {
    console.error(`Error: ${error.mesage}`);
  });