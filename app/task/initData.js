const mongo = require('promised-mongo');
const db = mongo('mongodb://localhost:27017/webstudy');
const xlsx = require('xlsx');
const path = require('path');

let data_path = path.join(__dirname, 'webStudy.xlsx');
let data_path1 = path.join(__dirname, 'students.xlsx');

let groups = [];
for (let i = 1; i <= 6; i++) {
    let group = xlsx.readFile(data_path).Sheets['第' + i + '组'];
    groups.push(xlsx.utils.sheet_to_json(group));
}

//处理student
let students = xlsx.utils.sheet_to_json(xlsx.readFile(data_path1).Sheets['Sheet1']);
for (let i = 0; i < students.length; i++) {
    students[i].picture = '/public/' + students[i].picture;
    delete students[i].totalGroup;
}
// console.log(groups);

//处理answer
let answers = [];
for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < groups[i].length; j++) {
        answers.push({
            studentId: groups[i][j]['学号'],
            right: parseInt(groups[i][j]['回答正确']),
            littleRight: parseInt(groups[i][j]['回答基本正确']),
            mistake: parseInt(groups[i][j]['回答错误'])
        });
        // answers.push({
        //     studentId: groups[i][j]['学号'],
        //     right: 0,
        //     littleRight: 0,
        //     mistake: 0
        // });
    }
}
let imoocCourses = [];

imoocCourses.push({
    name: "HTML+CSS基础课程",
    parentUrl: "/courses?sort=time&skill_id=7",
    courseId: 9
})
imoocCourses.push({
    name: "JavaScript入门篇",
    parentUrl: "/courses?sort=time&skill_id=44",
    courseId: 36
});

let imoocGroups = [];
for (let i = 0; i < groups.length; i++) {
    let group = [];
    for (let j = 0; j < groups[i].length; j++) {
        group.push(groups[i][j]['学号']);
    }
    imoocGroups.push({
        index: i + 1,
        member: group
    });
}

db.students.remove({});
db.answers.remove({});
db.groups.remove({});
db.imoocCourses.remove({});
for (let i = 0; i < students.length; i++) {
    db.students.insert(students[i]);
}
for (let i = 0; i < answers.length; i++) {
    db.answers.insert(answers[i]);
}
for (let i = 0; i < groups.length; i++) {
    db.groups.insert(imoocGroups[i]);
}
for (let i = 0; i < imoocCourses.length; i++) {
    db.imoocCourses.insert(imoocCourses[i]);
}
console.log('success');
// process.exit();