'use strict';
const path = require('path');
/**
 * 学生列表排序函数
 *
 * @param {any} a
 * @param {any} b
 * @returns
 */
function cmp(a, b) {
	if (b.course.completePercent == a.course.completePercent) {

		if (a.answer.right == b.answer.right) {

			if (b.answer.littleRight == a.answer.littleRight) {

				if (b.answer.mistake == a.answer.mistake) {

					return a.student.imoocId - b.student.imoocId;
				} else {

					return a.answer.mistake - b.answer.mistake;
				}
			} else {
				return b.answer.littleRight - a.answer.littleRight;
			}

		} else {
			return b.answer.right - a.answer.right;
		}
	} else {

		return b.course.completePercent - a.course.completePercent;
	}
}

function getMessage(ctx, students, courseId) {
	return new Promise(async function (resolve, rejece) {
		let message = [];
		for (let i = 0; i < students.length; i++) {
			let answer = await ctx.service.answer.getByStudentId(students[i].studentId);
			let course = await ctx.service.course.getByStudentAndId(students[i].studentId, courseId);
			message.push({
				student: students[i],
				answer: answer,
				course: course
			})
		}
		message.sort(cmp);
		resolve(message);
	})
}
let filePath_study = path.join(__dirname, '../public/download/webStudy.xlsx');
let filePath_answer = path.join(__dirname, '../public/download/webAnswer.xlsx');

module.exports = app => {
	class HomeController extends app.Controller {
		async index() {
			let group = this.ctx.query.g || 1;
			let courseId = this.ctx.query.c || 36
			let imoocCourses = await this.ctx.service.imoocCourse.getAll();
			let students = await this.ctx.service.student.getByGroup(group);
			let groupCount = await this.ctx.service.group.getCount();
			let message = await getMessage(this.ctx, students, courseId);

			await this.ctx.render('index.pug', {
				title: 'Web学习情况',
				currentPage: parseInt(group),
				totalPages: parseInt(groupCount),
				imoocCourses: imoocCourses,
				currentCourse: courseId,
				message: message,
				isAdmin: this.ctx.session && this.ctx.session.admin ? true : false,
				isStudy: true
			});

		}

		async search() {

			let queryName = this.ctx.query.q;
			let courseId = this.ctx.query.c || 36;
			if (queryName) {
				let imoocCourses = await this.ctx.service.imoocCourse.getAll();
				let students = await this.ctx.service.student.getByNameReg(queryName);
				let groupCount = await this.ctx.service.group.getCount();
				let message = await getMessage(this.ctx, students, courseId);

				await this.ctx.render('index.pug', {
					title: 'Web学习情况',
					imoocCourses: imoocCourses,
					currentCourse: courseId,
					message: message,
					queryName: queryName,
					isAdmin: this.ctx.session && this.ctx.session.admin ? true : false,
					isSearch: true,
					isStudy: true
				});
			} else {
				this.ctx.redirect('/');
			}
		}
	}
	return HomeController;
};