/**
 * Created by hwj12 on 2017/1/28.
 */
/**
 * 模板模块
 */
define([], function () {

    var getObject = function (selector) {
        var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
        return document[method](selector.substr(1));
    };

    return {
        g: getObject
    }
});
