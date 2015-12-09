'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src('svg-data-uri.js')
        .pipe(uglify({compress: true, mangle: true}))
        .pipe(rename('svg-data-uri.min.js'))
        .pipe(gulp.dest('./'));
});
