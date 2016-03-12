var gulp = require('gulp');
var uglify  = require('gulp-uglify');
var minify = require('gulp-minify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');

gulp.task('default',[
  'scripts',
	'concat js file in folder pg-*',
	'concat js file in folder components',
	'concat js file in folder app',
	'concat js file in folder js',
  'compile sass',
  'server']
  )

gulp.task('scripts', function() {
  // Single entry point to browserify 
  gulp.src('./app/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gutil.env.production
    }))
    .pipe(gulp.dest('./app/build/js'))
});

gulp.task('server', function() {

  browserSync.init({
          server: "./app",
          files:['./app/controller/*.*','./app/pg-*/*.*','./app/index.html','./app/controller/map/*.*']
      });

  // gulp.watch(['./app/pg-*/*.js'], ['concat js file in folder pg-*'])
  // gulp.watch(['./app/components/version/*.js'], ['concat js file in folder components'])
  // gulp.watch(['./app/*.js'], ['concat js file in folder app'])
  // gulp.watch(['./app/js/*.js'], ['concat js file in folder js'])
  gulp.watch(['./app/sass/*.sass'], ['compile sass'])
});

gulp.task('concat js file in folder pg-*', function() {
});

gulp.task('concat js file in folder components', function() {
});

gulp.task('concat js file in folder app', function() {
  	// gulp.src('./app/*.js')
  	// .pipe(concat('app.js'))
  	// .pipe(gulp.dest('./app/js'))
   //  .pipe(browserSync.stream());
});

gulp.task('concat js file in folder js', function() {
 //  	gulp.src('./app/js/*.js')
 //  	// .pipe(uglify()).on('error', gutil.log)
 //  	.pipe(concat('lib.js'))
 //  	.pipe(rename({
 //      	suffix: '.min'
	// }))
 //  	.pipe(gulp.dest('./app/js/lib'))
 //    .pipe(browserSync.stream());
});

gulp.task('compile sass', function() {
    gulp.src('./app/sass/*.sass')
    .pipe(sass().on('error', gutil.log))
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

