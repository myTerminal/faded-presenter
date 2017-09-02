/* global require */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-cleancss'),
    watchNow = require ('gulp-watch-now');

gulp.task('scripts-vendor', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/showdown/dist/showdown.min.js'
    ]).pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('scripts'));
});

gulp.task('styles', function () {
    return gulp.src('styles/faded-presenter.less')
        .pipe(less())
        .pipe(concat('faded-presenter.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('styles'));
});

gulp.task('build', [
    'scripts-vendor',
    'styles'
]);

gulp.task('develop', function () {
    watchNow.watch(gulp, [
        'styles/**/*.less'
    ], [
        'styles'
    ]);
});

gulp.task('default', ['build']);
