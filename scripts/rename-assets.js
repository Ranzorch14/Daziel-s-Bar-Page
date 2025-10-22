const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

const renames = [
  { from: 'PiñaColada.png', to: 'pina-colada.png' }
];

function renameFile(from, to) {
  const src = path.join(assetsDir, from);
  const dst = path.join(assetsDir, to);
  if (!fs.existsSync(src)) {
    console.warn('Source not found:', src);
    return false;
  }
  if (fs.existsSync(dst)) {
    console.warn('Destination already exists, skipping:', dst);
    return false;
  }
  fs.copyFileSync(src, dst);
  fs.unlinkSync(src);
  console.log(`Renamed ${from} -> ${to}`);
  return true;
}

// Update references in HTML/CSS
function updateReferences(oldName, newName) {
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (/\.html$|\.css$/.test(e.name)) {
        let txt = fs.readFileSync(full, 'utf8');
        const replaced = txt.split(oldName).join(newName);
        if (replaced !== txt) {
          fs.writeFileSync(full, replaced, 'utf8');
          console.log('Updated refs in', full);
        }
      }
    }
  };
  walk(path.join(__dirname, '..'));
}

for (const r of renames) {
  if (renameFile(r.from, r.to)) {
    updateReferences(r.from, r.to);
  }
}

console.log('Rename script finished.');
