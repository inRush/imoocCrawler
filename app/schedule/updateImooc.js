const robot = require('../task/robot');
const excel = require('../task/excel');
module.exports = app => {
    return {
        // 通过 schedule 属性来设置定时任务的执行间隔等配置
        schedule: {
            interval: '1h', // 1小时间隔
            type: 'worker', // 指定所有的 worker 都需要执行
            immediate: true,
            disable:app.config.env == 'local'//本地开发环境中不执行
        },
        // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
        async task(ctx) {
            let students = await ctx.service.student.getAll();
            let imoocCourses = await ctx.service.imoocCourse.getAll();
            let courses = [];
            for (let i = 0; i < imoocCourses.length; i++) {
                let course = await robot(imoocCourses[i], students);
                courses.push.apply(courses, course);
            }
            ctx.logger.info("成功爬取" + courses.length + "个页面");
            await ctx.service.course.updateCourse(courses);

            let result = await excel();
            ctx.logger.info("已更新" + result.length + "条信息到excel中");
        }
    }

};