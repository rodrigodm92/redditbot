const reddit = require('./reddit.js');

(async () => {

    await reddit.initialize('node');
    let results = await reddit.getResults(10);
    
})();