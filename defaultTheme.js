var aspectRange = [];
for (var i = 1; i <= 16; i++) {
  aspectRange.push(i);
}

module.exports = {
  w: aspectRange,
  h: aspectRange,
  '16/9': [16, 9],
  '4/3': [4, 3],
  '3/2': [3, 2],
  '1/1': [1, 1],
  'video': [16, 9],
  'square': [1, 1],
}