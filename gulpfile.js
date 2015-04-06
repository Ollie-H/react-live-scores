var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS   = require('gulp-minify-css');
var concat      = require('gulp-concat');
var connect     = require('gulp-connect');
var livereload = require('gulp-livereload');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('styles', function () {
    return sass('./static/sass/styles.scss') 
      .pipe(autoprefixer({
           browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
           cascade:  true
       }))
      .pipe(concat('styles.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./static/css/'))
      .pipe(livereload());
});

gulp.task('scripts', function() {
    // Single entry point to browserify 
    return browserify('./static/js/app.js')
      .transform(reactify)
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./static/js-dist'))
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./static/sass/**/*.scss', './static/sass/*.scss'], ['styles']);
    gulp.watch(['./static/js/*.js', './static/js/**/*.js', './static/js/**/*.jsx'], ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);