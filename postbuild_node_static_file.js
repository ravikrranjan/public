import shell from 'shelljs';

const buildFolder = './build/';

const files = new Set(['README.md', 'package.json', 'yarn.lock']);
const folders = new Set(['./src/views', './src/assest']);

// Copy Files
files.forEach((file) => {
    shell.cp('-R', file, buildFolder);
});

// Copy Folders
folders.forEach((folder) => {
    shell.cp('-R', folder, buildFolder + '/src');
});
