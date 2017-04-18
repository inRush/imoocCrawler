var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/u/';
var request = require('request');
var Promise = require('bluebird')
/**
 * 异步获取网页的信息
 *
 * @param {any} url
 * @returns
 */
function getPageAsync(url, name, courseId, studentId) {
    return new Promise(async function (resolve, reject) {
        request({
            url: url
        }, function (err, response, body) {
            if (err) {
                reject(err);
            } else {
                let studyMessage = analysisBody(body, name, courseId, studentId);
                resolve(studyMessage);
            }
        });
    });
};

/**
 * 解析body信息
 *
 * @param {any} main
 * @returns
 */
function analysisBody(body, defaultName, courseId, studentId) {

    var $ = cheerio.load(body);
    var courses = $('.course-one');

    var courseName, completePercent, useTime, chapterId, chapterTitle;
    var courseBody;
    var studyMessage;

    for (var i = 0; i < courses.length; i++) {
        if ($(courses[i]).attr('data-courseid') == courseId) {
            courseBody = courses[i];
            break;
        }
    }

    //解析学习信息
    courseName = $(courseBody).find('.study-hd a').text();
    var points = $($(courseBody).find('.study-points'));
    completePercent = points.find('.i-left').text().substr(2);
    useTime = points.find('.i-mid').text().substr(2).trim();
    var chapter = points.find('.i-right').text().split(' ');
    chapterId = chapter[0].substr(3);
    chapterTitle = chapter[1];

    studyMessage = {
        studentId: studentId,
        courseId:courseId,
        courseName: courseName || defaultName,
        completePercent: completePercent && parseInt(completePercent) || 0,
        useTime: useTime,
        chapterId: chapterId,
        chapterTitle: chapterTitle
    };

    return studyMessage;
}

module.exports = function (courseMessage, students) {
    return new Promise(function (resolve, reject) {
        //获取基本的信息
        let name = courseMessage.name;
        let url = courseMessage.parentUrl;
        let courseId = courseMessage.courseId;
        max = students.length;
        //组装Promise
        //提取学生学习信息promise
        var fetchStudyMessage = [];
        for (let i = 0; i < students.length; i++) {
            fetchStudyMessage.push(getPageAsync(baseUrl + students[i].imoocId + url, name, courseId, students[i].studentId));
        }


        Promise.all(fetchStudyMessage).then(function (courses) {
            resolve(courses);
        }).catch(function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
};