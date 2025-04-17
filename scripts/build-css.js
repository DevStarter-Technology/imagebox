const { execSync } = require('child_process');
const fs = require('fs');

// Создаем папку dist, если ее нет
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Запускаем компиляцию SCSS → CSS с минификацией
execSync('npx sass src/style.scss dist/css/imagebox.min.css --style=compressed', { stdio: 'inherit' });
