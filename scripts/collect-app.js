// @ts-check
const fs = require('fs');
const path = require('path');
require('dotenv/config');

function copyFolderRecursiveSync(source, destination) {
  // 获取源文件夹中的所有文件和子文件夹
  const files = fs.readdirSync(source);

  // 确保目标文件夹存在
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    const stats = fs.statSync(sourcePath);

    if (stats.isFile()) {
      // 如果是文件，直接复制
      fs.copyFileSync(sourcePath, destinationPath);
    } else if (stats.isDirectory()) {
      // 如果是文件夹，递归复制
      copyFolderRecursiveSync(sourcePath, destinationPath);
    }
  });
}

const deleteFolderRecursive = function (directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

deleteFolderRecursive(path.join(__dirname, '../public/apps'));
copyFolderRecursiveSync(
  path.join(__dirname, `../../${process.env.FRONT_END_PROJECT_NAME}/packages/app-store/dist`),
  path.join(__dirname, '../public/apps')
);

// write json
const appDirectories = fs
  .readdirSync(path.join(__dirname, '../public/apps'), { withFileTypes: true })
  .filter(dir =>
    fs.readdirSync(path.join(__dirname, `../public/apps/${dir.name}`)).includes('logo.png')
  )
  .map(dir => dir.name);
const jsonPath = path.join(__dirname, '../src/dev-data/app.json');
const jsonContent = appDirectories.map(name => ({ name }));
fs.writeFileSync(jsonPath, JSON.stringify(jsonContent));
