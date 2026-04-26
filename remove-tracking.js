const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else {
      callback(p);
    }
  });
}

const regex = /\s*tracking-(?:widest|wider|wide|\[[^\]]+\])/g;

walk('app', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const newContent = originalContent.replace(regex, '');
    if (originalContent !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
