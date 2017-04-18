'use strict';

// had enabled by egg
exports.static = true;
exports.pug = {
    enabled: true,
    package: 'egg-view-pug'
};
exports.validate = {
    enable: true,
    package: 'egg-validate',
};
exports.mongoose = {
    enabled: true,
    package: 'egg-mongoose'
}
exports.userrole = {
    package: 'egg-userrole',
};