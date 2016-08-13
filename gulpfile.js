var gulp = require('gulp'),
	// 配合 chrome 插件 LiveReload 使浏览器自动刷新
    connect = require('gulp-connect'),
    // 在浏览器端可以使用 require() 的方式引入 js 文件
    browserify = require('gulp-browserify'),
    // 合并javascript文件插件
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    // 校验 js 语法
    jshint = require('gulp-jshint'),
    // 文件压缩插件
    uglify = require('gulp-uglify'),

    babel = require("gulp-babel"),
    es2015 = require("babel-preset-es2015"),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    port = process.env.port || 5000;

gulp.task('browserify',function(){
	gulp.src(['./src/js/main.js'])
	.pipe(browserify({
		transform: 'reactify',
	}))
	.pipe(plumber()) 
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('connect',function(){
	connect.server({
		// root:'./',
		port: port,
		livereload: true,
	})
});

gulp.task('js',function(){
	gulp.src('./dist/**/*.js')
	.pipe(plumber()) 
	.pipe( connect.reload() )
});

gulp.task('html',function(){
	gulp.src('./src/**/*.html')
	.pipe(plumber()) 
	.pipe( connect.reload() )
});

// es6 转 es5
gulp.task('es6', function(){
	gulp.src('./src/es6/**/*.js')
	.pipe(plumber()) 
	.pipe(babel({presets: [es2015]}))
	.pipe(gulp.dest('./dist/js'))
	.pipe( connect.reload() );
});

// less 转 css
gulp.task('less', function(){
	gulp.src('./src/less/**/*.less')
	.pipe(plumber()) 
	.pipe(less())
	.pipe(gulp.dest('./dist/css'))
	.pipe( connect.reload() );
});

gulp.task('watch',function(){
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('./src/**/*.html',['html']);
	gulp.watch('./src/less/**/*.less',['less']);
	gulp.watch('./src/es6/**/*.js',['es6']);
	gulp.watch('./src/js/**/*.js',['browserify']);	
});



gulp.task('default',['browserify']);

gulp.task('server',['watch','browserify','connect','es6','less']);
