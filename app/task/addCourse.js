const mongo = require('promised-mongo');
const db = mongo('mongodb://localhost:27017/webstudy');
const xlsx = require('xlsx');
const path = require('path');

let imoocCourses = [];
imoocCourses.push({
    name: "JavaScript深入浅出",
    parentUrl: "/courses?sort=time&skill_id=44",
    courseId: 277
})
imoocCourses.push({
    name: "JavaScript进阶篇",
    parentUrl: "/courses?sort=time&skill_id=44",
    courseId: 10
});


for (let i = 0; i < imoocCourses.length; i++) {
    db.imoocCourses.insert(imoocCourses[i]);
}
console.log('success');
// process.exit();