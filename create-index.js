const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'reports');

// Проверяем, существует ли директория
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

// Получаем все файлы в директории
const files = fs.readdirSync(reportsDir)
    .filter(file => file.endsWith('.html'))
    .map(name => ({
        name,
        url: `reports/${name}`,
        date: fs.statSync(path.join(reportsDir, name)).mtime
    }))
    .sort((a, b) => b.date - a.date); // Сортируем по дате изменения, новые первыми

// Записываем информацию в index.json
fs.writeFileSync(
    path.join(reportsDir, 'index.json'),
    JSON.stringify(files, null, 2)
);

console.log(`Created index.json with ${files.length} reports`);