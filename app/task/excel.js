var fs = require('fs');
var xlsx = require('node-xlsx');
var path = require('path');
const mongo = require('promised-mongo');
const db = mongo('mongodb://localhost:27017/webstudy');
var moment = require('moment');
moment.locale('zh-CN');

let targetPath = path.join(__dirname, '../public/download/');
let fileName_study = 'webStudy.xlsx';
let fileName_answer = 'webAnswer.xlsx'

/**
 * 学生列表排序函数
 *
 * @param {any} a
 * @param {any} b
 * @returns
 */
function cmp(a, b) {
    let aSum = 0,
        bSum = 0;
    for (let i = 0; i < a.courses.length; i++) {
        aSum += a.courses[i].completePercent;
        bSum += b.courses[i].completePercent;
    }
    return bSum - aSum;
}

var g = async function () {
    let stus = await db.students.find();
    let imoocCourses = await db.imoocCourses.find();
    let message = [];
    for (let i = 0; i < stus.length; i++) {
        let courses = [];

        for (let j = 0; j < imoocCourses.length; j++) {
            // console.log(imoocCourses.name);
            // console.log(stus[i].studentId);
            courses.push(await db.courses.findOne({
                courseName: imoocCourses[j].name,
                studentId: stus[i].studentId
            }));
        }

        let answer = await db.answers.findOne({
            studentId: stus[i].studentId
        });
        message.push({
            student: stus[i],
            answer: answer,
            courses: courses
        })
    }

    let excel_study = [];
    let excel_answer = [];
    let totalGroup = await db.groups.count();
    for (let i = 0; i < totalGroup; i++) {
        excel_study.push({
            name: '第' + (i + 1) + '组',
            data: [
                ['学号', '慕课网Id', '姓名', '课程名称', '学习进度', '学习用时', '最近学习', '章节编号']
            ]
        });
        excel_answer.push({
            name: '第' + (i + 1) + '组',
            data: [
                ['学号', '姓名', '回答正确', '回答基本正确', '回答错误']
            ]
        })
    }
    excel_study.push({
        name: '更新时间',
        data: [
            [moment().format('LLLL')]
        ]
    });
    excel_answer.push({
        name: '更新时间',
        data: [
            [moment().format('LLLL')]
        ]
    });

    message.sort(cmp);
    for (let i = 0; i < message.length; i++) {
        for (let j = 0; j < message[i].courses.length; j++) {
            excel_study[message[i].student.group - 1].data.push(
                [
                    message[i].student.studentId,
                    message[i].student.imoocId,
                    message[i].student.name,
                    message[i].courses[j].courseName,
                    message[i].courses[j].completePercent + '%',
                    message[i].courses[j].useTime,
                    message[i].courses[j].chapterTitle,
                    message[i].courses[j].chapterId
                ]);
            excel_answer[message[i].student.group - 1].data.push(
                [
                    message[i].student.studentId,
                    message[i].student.name,
                    message[i].answer.right,
                    message[i].answer.littleRight,
                    message[i].answer.mistake,
                ]);
        }

    }

    let buffer_study = xlsx.build(excel_study);
    fs.writeFileSync(targetPath + fileName_study, buffer_study);
    let buffer_answer = xlsx.build(excel_answer);
    fs.writeFileSync(targetPath + fileName_answer, buffer_answer);
    return message;
};
module.exports = g;

// (async function(){
//     await g();
//     process.exit();
// })()