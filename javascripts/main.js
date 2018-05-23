const apiKeys = require('./apiKeys');
const events = require('./events');

events.initializer();
apiKeys.retrieveKeys();
