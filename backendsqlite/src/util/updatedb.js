const { initDb } = require('./initdb');

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  await initDb();
})();
