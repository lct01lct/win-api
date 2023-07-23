// @ts-check

const fs = require('fs');
const path = require('path');

const res = fs
  .readdirSync(path.join(__dirname, '../../Win10-in-Vue/packages/app-store/dist'), {
    withFileTypes: true,
  })
  .filter(file => {
    return file.isFile();
  });

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

copyFolderRecursiveSync(
  path.join(__dirname, '../../Win10-in-Vue/packages/app-store/dist'),
  path.join(__dirname, '../public/apps')
);