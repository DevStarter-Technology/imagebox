const { build } = require('esbuild');
const path = require('path');
const fs = require('fs');

const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

build({
  entryPoints: ['src/script.js'],
  bundle: false,
  minify: true,
  outfile: 'dist/js/imagebox.min.js',
  target: ['es2015'],
})
  .then(() => {
    console.log('JS успешно собран и минифицирован.');
  })
  .catch((e) => {
    console.error('Ошибка при сборке JS:', e);
    process.exit(1);
  });
