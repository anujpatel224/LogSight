const fs = require('fs');
const path = require('path');

const getTodayLogFile = () => {
  const now = new Date();
  const fileName = `log.${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}.json`;
  const logsDir = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }
  return path.join(logsDir, fileName);
};

exports.loadLogs = () => {
  const filePath = getTodayLogFile();
  console.log(filePath)
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

exports.saveLog = (log) => {
  const logs = exports.loadLogs();
  logs.push(log);
  const filePath = getTodayLogFile();
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
};
