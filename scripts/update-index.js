const fs = require('fs');
const path = require('path');

// Путь к папке с отчетами
const reportsDir = path.join(__dirname, '..', 'reports');

// Проверяем существование папки
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
  console.log("Created reports directory");
}

// Получаем список HTML-файлов
const files = fs.readdirSync(reportsDir)
  .filter(file => file.endsWith(".html"))
  .map(name => ({
    name,
    date: fs.statSync(path.join(reportsDir, name)).mtime.toISOString()
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Создаем index.json
fs.writeFileSync(
  path.join(reportsDir, "index.json"),
  JSON.stringify(files, null, 2)
);

console.log(`Created index.json with ${files.length} reports`);
