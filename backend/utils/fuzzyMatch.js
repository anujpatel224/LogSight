function isFuzzyMatch(logMessage, input) {
  const target = logMessage.toLowerCase();
  const chars = input.toLowerCase().split('');
  let index = 0;

  for (const char of chars) {
    index = target.indexOf(char, index);
    if (index === -1) return false;
    index++;
  }
  return true;
}

module.exports = { isFuzzyMatch };
