/**
 * Created by hwj12 on 2017/1/28.
 * 控制模块
 */
 define(['jquery','calculate', 'obtain'], function ($,calculate, obtain) {
    var ranges = calculate.range();
    var _photo = $('.photo');
    var current_center = 1;

    function Control() {
        this.opts = arguments[0] ? arguments : Control.DEFAULTS;
        current_center = this.opts.center;
    }

    Control.prototype.changeCenter = function (n) {
        current_center = n;
    };


    Control.prototype.rsort = function () {
        var photos = initPhoto();

        for (var i = 0; i < photos.length; i++) {
            _annularMode(photos[i]);
        }
    };

    Control.DEFAULTS = {
        center: '15145306'
    };

    function initPhoto() {
        var photos = [];
        for (var i = 0; i < _photo.length; i++) {
            _photo[i].className = _photo[i].className.replace(/\s*photo_center/, '');
            _photo[i].className = _photo[i].className.replace(/\s*photo_front/, '');
            _photo[i].className = _photo[i].className.replace(/\s*photo_back/, '');
            _photo[i].className += ' photo_front';
            _photo[i].style['transform'] = 'rotate(0deg)';
            photos.push(_photo[i]);
        }
        return photos;
    };

 //    function setCenter(array) {
 //        var photo_center = $('#' + current_center);
 //        var cls = photo_center.attr('class');
 //        photo_center.attr('class',cls + ' photo_center');
 //        console.log(photo_center.attr('class'));
 //        for (var i = array.length - 1; i >= 0; i--) {
 //            if(array[i].id == current_center){
 //             array.splice(i, 1);
 //             break;
 //         }
 //     }
 //     return array;
 // };

 Control.prototype.selectCenter = function(photo_center){
     photo_center.className = 'photo photo_front photo_center';
     photo_center.style.transform = 'rotate(0deg)';

};

 Control.prototype.recovery = function(elem){
    _annularMode(elem);
 }

function _annularMode(obj) {
    var width = obj.offsetWidth;
    var height = obj.offsetHeight;
    
    var rangeAngle = calculate.random([0, 360]);
    var radius = width > height ? width + 50 : height + 50;
    var xOffset = Math.cos((90 - rangeAngle ) * (Math.PI / 180)) * radius;
    var yOffset = Math.sin((90 - rangeAngle) * (Math.PI / 180)) * radius;
    obj.style['transform'] = 'translate(' + xOffset + 'px,' + -yOffset + 'px) rotate(' + rangeAngle + 'deg)';
};

Control.prototype.turn = function (elem,startBtn) {
    var cls = elem.className;

    if (/photo_front/.test(cls)) {
        cls = cls.replace(/photo_front/, 'photo_back');
    }
    return elem.className = cls;
};

return {
    Control: Control
};
});

 // if (!/photo_center/.test(cls)) {
        //     this.changeCenter(n);
        //     return this.rsort();
        // }
