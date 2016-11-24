# 使用gulp快速开发前端项目
### 项目需配置 node.js + npm 环境
### 使用gulp自动实现
* 图片压缩
* css代码自动添加浏览器厂商前缀，代码压缩
* js代码检测、压缩
* 代码热更新

## 1. 项目文件目录
	app/---------------------------- 项目源文件
		    css/
		    images/
		    js/
		    index.html
    dist/----------------------------  经过gulp处理后的文件
    gulpfile.js----------------------  gulp配置文件
    package.json---------------------  开发依赖文件

## 2. 安装开发依赖
	cnpm install

## 3.配置gulp文件
### 3.1 引入文件，参考[common.js规范](https://book.douban.com/reading/29343570/)
	var gulp = require('gulp');
    var del = require('del');
    var browserSync = require('browser-sync').create();  // 静态服务器
    var reload = browserSync.reload;
    var watch = require('gulp-watch');
    var imagemin = require('gulp-imagemin');
    var $ = require('gulp-load-plugins')();
### 3.2 配置gulp任务
#### 3.2.1 图片压缩，压缩等级为3级，总共0-7级，参考[imagemin配置](https://github.com/sindresorhus/gulp-imagemin#user-content-options)
    gulp.task('image', function() {
        return gulp.src('app/images/**/*')------------------------------文件入口
            .pipe($.cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
            .pipe(gulp.dest('dist/images'));----------------------------文件出口，即压缩后的文件的存放路径
    });

#### 3.2.2 css压缩,自动添加前缀
    gulp.task('css', function () {
       gulp.src('app/css/**/*')
           .pipe($.autoprefixer())
           .pipe($.minifyCss())
           .pipe(gulp.dest('dist/css'));
    });

#### 3.2.3 js压缩,检测
    gulp.task('js', function () {-----------------------------压缩
        gulp.src(['app/js/**/*.js'])
            .pipe($.jshint.reporter('default'))
            .pipe($.uglify())
            .pipe(gulp.dest('dist/js'))
    });
    gulp.task('lint', function () {---------------------------检测
        gulp.src('gulpfile.js')
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'));
    });

#### 3.2.4 复制html
    gulp.task('html', function () {
       gulp.src('app/**/*.html')
           .pipe(gulp.dest('dist/'))
    });


#### 3.2.5 自动刷新
    gulp.task('serve', function () {
        browserSync.init({
            server:{baseDir:'./app'},
            browser:'chrome'
        });
    });

#### 3.2.6 watch监控
    gulp.task('watch', function () {
        gulp.watch(['app/**/*'],reload);
    });

#### 3.2.7 css,js重命名
    gulp.task('rename', function () {
       gulp.src(['!dist/**/*min.js','!dist/**/*min.css','dist/**/*.css','dist/**/*.js'])
           .pipe($.rename({suffix:'.min'}))
           .pipe(gulp.dest('dist/'));
    });


#### clean
    gulp.task('clean', function (cb) {
       del(['dist/**/*'],cb);
    });
### 4. 配置默认任务
    gulp.task('default',['image','js','css','serve','watch']);

## 如何使用？
    gulp -------------------------启动默认任务default
### 单独启动某一个任务
    gulp image---------------------压缩图片
    gulp js------------------------压缩js文件

## 用gulp开发的一个小[案例](https://peng1992.github.io/H5-templete/)



