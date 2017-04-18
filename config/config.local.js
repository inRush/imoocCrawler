const path = require('path');
module.exports = appInfo => {
    return {
        logger: {
            dir: path.join(appInfo.root, 'logs/local/'),
            level: 'DEBUG',
            consoleLevel: 'DEBUG',
        }
    }
}