/**
 * Created by hwj12 on 2017/1/28.
 */
/**
 * 计算模块
 */
define(['obtain'], function (obtain) {

    var random = function (range) {
        var max = Math.max(range[0], range[1]);
        var min = Math.min(range[0], range[1]);

        var diff = max - min + 1;
        return Math.floor(Math.random() * diff + min);
    };


    /**
     * 计算所有分区的范围
     *
     * @returns
     */
    var range = function () {
        var ranges = {x: [], y: []};
        var wrapBody = obtain.g('#wrap');
        var photoBody = obtain.g('.photo')[0];
        var wrap = {
            w: wrapBody.clientWidth,
            h: wrapBody.clientHeight
        };
        var photo = {
            w: photoBody.clientWidth,
            h: photoBody.clientHeight
        };
        ranges.wrap = wrap;
        ranges.photo = photo;
        ranges.x = [photo.w, wrap.w / 2];
        ranges.y = [0 - photo.h, wrap.h - photo.h / 2];
        return ranges;
    };

    return {
        random: random,
        range: range
    }
});
