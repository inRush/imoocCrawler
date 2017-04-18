/**
 * Created by hwj12 on 2017/1/28.
 */

define(['jquery', 'obtain', 'control', 'calculate', "bootstrap"], function ($, obtain, control, calculate) {
    var c = new control.Control();
    $.noConflict();
    var startBtn = $('#start');
    var photo = $('.photo');
    var rights = $('.right');
    var littlerights = $('.littleright');
    var mistakes = $('.mistake');
    var noScroing = $('.noScoring');
    var scoring = $('#scoringMessage');
    var message = $('#message');
    var centerImg;
    $.ajaxSetup({
        contentType: 'application/json'
    });

    function turnPhoto(elem) {
        centerImg.css('-webkit-filter', 'blur(25px)');
        centerImg.css('filter', 'blur(25px)');
        var cls = elem.className;
        cls = cls.replace(/photo_back/, 'photo_front');
        cls = cls.replace(/photo_center/, '');
        c.recovery(elem);
        startBtn.css('display', 'block');
        elem.className = cls;
    }
    let time = 0;

    function minNumber(numbers) {
        let minNumber, min = 99999;
        let minAnwId, minAnw;
        numbers.forEach(function (number) {
            let anwId = "#anw" + photo[number].id;
            let anw = $(anwId).data('anw');
            if (anw < min) {
                min = anw;
                minNumber = number;
                minAnwId = anwId;
                minAnw = anw;
            }
        });
        minAnw++;
        $(minAnwId).html("点名次数:" + minAnw);
        return minNumber;
    }

    function startPolling() {
        startBtn.css('display', 'none');
        timer = window.setInterval(function () {
            c.rsort();
            time++;
            if (time > 1) {
                clearInterval(timer);
                time = 0;
                window.setTimeout(function () {
                    let numbers = [];
                    for (let i = 0; i < 5; i++) {
                        numbers.push(calculate.random([0, photo.length - 1]));
                    }

                    let number = minNumber(numbers);

                    c.selectCenter(photo[number]);
                    var id = photo[number].id;
                    var img = $('#image_' + id).children('img');
                    centerImg = img;
                    var startBlur = parseInt(img.css('filter').split('p')[0].split('(')[1]);

                    setTimeout(function () {
                        var timer = setInterval(function () {
                            img.css('-webkit-filter', 'blur(' + startBlur + 'px)');
                            img.css('filter', 'blur(' + (startBlur -= 1) + 'px)');
                            if (startBlur < 0) {
                                clearInterval(timer);
                            }
                        }, 50);
                    }, 500);


                }, 1500);
            }
        }, 1000);
    }

    function ajaxPost(e, answer) {
        var target = $(e.target);
        var number = target.data('number');
        var name = $('#name_' + number).text();
        var answerStudent = {
            number: number,
            name: name,
            answer: answer
        }

        $.post("/rollcall/answer", JSON.stringify(answerStudent), function (result) {
            var anw;
            switch (answer) {
                case 1:
                    anw = "正确"
                    break;
                case 0:
                    anw = "基本正确"
                    break;
                case -1:
                    anw = "错误"
                    break;
            }
            console.log(result);
            if (result.success == 1) {
                message.text(answerStudent.name + " 计分成功，此次回答" + anw);
            } else {
                message.text(answerStudent.name + " 计分失败," + result.err);
                scoring.on('hidden.bs.modal', function () {
                    window.location.href = "/login";
                });

            }


            $('#scoringMessage').modal({
                show: true
            });

            turnPhoto($('#' + number).get(0));
        });
    }


    var start = function () {


        let imgs = $('.image');
        for (let i = imgs.length - 1; i >= 0; i--) {
            let img = $(imgs[i]);
            let picture = img.attr("data-picture");
            img.find('img').get(0).src = picture;
        }


        /**
         * 事件绑定
         */
        for (var i = 0; i < photo.length; i++) {
            photo[i].onclick = function () {
                var cls = this.className;
                if (/photo_center/.test(cls)) {
                    return c.turn(this, startBtn);
                }
            }

            rights[i].onclick = function (e) {
                ajaxPost(e, 1);
            }

            littlerights[i].onclick = function (e) {
                ajaxPost(e, 0);
            }

            mistakes[i].onclick = function (e) {
                ajaxPost(e, -1);
            }
            noScroing[i].onclick = function (e) {
                let target = $(e.target);
                let number = target.data('number');
                turnPhoto($('#' + number).get(0));
            }
        }

        startBtn.click(function () {
            startPolling();
        });


        c.rsort();
    }



    return {
        start: start
    }
});