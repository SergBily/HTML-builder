const path = require('path'),
  { readdir, readFile, mkdir, writeFile, copyFile, unlink } = require('fs/promises'),
  styles = path.join(__dirname, 'styles'),
  assets = path.join(__dirname, 'assets');


async function createHtmlPage() {
  await mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  const template = await readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
  const components = await readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  let bundleHtml = template;

  for (const comp of components) {
    const ext = /\.html$/;

    if (comp.isFile() && comp.name.match(ext)) {
      const expComponent = comp.name.split('.')[0];
      const component = await readFile(path.join(__dirname, `/components/${comp.name}`), 'utf-8');
      bundleHtml = bundleHtml.replace(RegExp(`{{${expComponent}}}`), component);
    }
  }
  await writeFile(path.join(__dirname, 'project-dist/index.html'), bundleHtml);
}

createHtmlPage()
  .then(async () => {
    const readStyle = await readdir(styles, { withFileTypes: true });
    let bundleCss = [];

    for (const file of readStyle) {
      const ext = /\.css$/;

      if (file.isFile() && file.name.match(ext)) {
        const readF = await readFile(`${styles}/${file.name}`, {encoding: 'utf-8'});
        bundleCss.push(`${readF}\n`);
      }
      await writeFile(path.join(__dirname, 'project-dist/style.css'), bundleCss); 
    }
  })
  .then(async () => {
    await mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true });
    const readProject = await readdir(path.join(__dirname, 'project-dist/assets'), { withFileTypes: true });
    const readAssets = await readdir(assets, { withFileTypes: true });

    if (readProject.length !== 0) {
      deleteAssets(readProject);
    } 
    copyFiles(readAssets);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });


async function copyFiles(files) {
  try {
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(path.join(assets, file.name), path.join(__dirname, `project-dist/assets/${file.name}`));
      } else {
        const readDir = await readdir(path.join(assets, file.name), { withFileTypes: true });
        await mkdir(path.join(__dirname, `project-dist/assets/${file.name}`), { recursive: true });
        for (const f of readDir) {
          await copyFile(path.join(assets, `${file.name}/${f.name}`), path.join(__dirname, `project-dist/assets/${file.name}/${f.name}`));
        }
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}


async function deleteAssets(file) {
  try {
    for (const f of file) {
      if (f.isFile()) {
        await unlink(path.join(__dirname, `project-dist/assets/${f.name}`));
      } else {
        const read =  await readdir(path.join(__dirname, `project-dist/assets/${f.name}`), { withFileTypes: true });
        for (const file of read) {
          await unlink(path.join(__dirname, `project-dist/assets/${f.name}/${file.name}`));
        }
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
