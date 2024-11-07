const express = require('express');
const { Command } = require('commander');
const program = new Command();

const app = express();

program
  .requiredOption('-h, --host <host>', 'Адреса сервера')
  .requiredOption('-p, --port <port>', 'Порт сервера')
  .requiredOption('-c, --cache <cache>', 'Шлях до директорії для кешу')
  .parse(process.argv);

const options = program.opts();

if (!options.host || !options.port || !options.cache) {
  console.error('Помилка: не вказано Host, Port або Cache directory.');
  process.exit(1);
}

console.log(`Host: ${options.host}`);
console.log(`Port: ${options.port}`);
console.log(`Cache directory: ${options.cache}`);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(options.port, options.host, () => {
  console.log(`Сервер працює на http://${options.host}:${options.port}`);
});
