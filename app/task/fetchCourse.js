const robot = require('./robot');

const mongo = require('promised-mongo');
const db = mongo('mongodb://localhost:27017/webstudy');

(async function () {
    let students = await db.students.find();
    let imoocCourses = await db.imoocCourses.find();

    let courses = [];
    console.log(imoocCourses)
    for (let i = 0; i < imoocCourses.length; i++) {
        let course = await robot(imoocCourses[i], students);
        courses.push.apply(courses, course);
    }
    await db.courses.remove({});

    for (let i = 0; i < courses.length; i++) {
        await db.courses.insert(courses[i]);
    }
    process.exit();
})()