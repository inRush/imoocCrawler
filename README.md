# 慕课网学习情况的小爬虫，以及Web课程的学习回答情况



##

***下载项目代码以后***

```bash
$ npm install
$ npm run dev
```

> ***本项目具有定时更新的功能，每一个小时从慕课网中爬取指定的学生学习课程信息***<br/>
> ***项目里已将数据整理好成Excel表格，可随时下载***



## 本项目采用阿里的基础框架Egg
如需进一步了解，参见 [egg 文档][egg]。

### 本地开发
```bash
$ npm install
$ npm run dev
$ open http://localhost:5000/news
```

### 部署

线上正式环境用 `EGG_SERVER_ENV=prod` 来启动。

```bash
$ EGG_SERVER_ENV=prod npm start
```

### 单元测试
- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 -单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org