var gulp = require('gulp');
var browserify = require("browserify");
var rename = require('gulp-rename');
var babelify = require("babelify");
var fs = require("fs");
var browserSync = require('browser-sync').create();
// Basic usage 
gulp.task('js', function() {
	return browserify("./src/app.jsx")
    .transform(babelify.configure({
        presets: ["es2015", "react"]
    }))
    .bundle()
    .pipe(fs.createWriteStream("bundle.js"))
});
gulp.task('watch',['js'],browserSync.reaload);
gulp.task('serve',['js'],function(){
     browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("js/*.js", ['watch']);
})