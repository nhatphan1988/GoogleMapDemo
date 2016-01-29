var gulp = require('gulp');
var uglify  = require('gulp-uglify');
var minify = require('gulp-minify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('default', function() {
  	return gulp.src('./app/*.js')
  	.pipe(uglify())
  	.pipe(concat('app.js'))
  	.pipe(rename({
      	suffix: '.min'
	}))
  	.pipe(gulp.dest('./bin/src/app'))
});