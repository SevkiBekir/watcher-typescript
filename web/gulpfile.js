/**
 * Created by herdemir on 20.04.2016.
 */
// Process ES6 on the fly
require('babel/register');

// Include every file in gulp/scripts
require('require-dir')('gulp/tasks');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del');

var fontawesomeSrc = ['node_modules/font-awesome/**/*.min.css', 'node_modules/font-awesome/fonts/*ont*wesome*.*'];


gulp.task('copyFontawesome', function () {
    gulp.src(fontawesomeSrc, {base: './node_modules/font-awesome/'})
        .pipe(gulp.dest("dist/font-awesome"));
});

gulp.task('copySystemJs', function () {
    gulp.src('jspm_packages/system-csp-production.js')
        .pipe(rename('system.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copyAssets', function () {
    gulp.src('assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
    gulp.src('jspm_packages/npm/primeui*/primeui-ng-all.min.css')
        .pipe(concat('primeui-ng-all.min.css'))
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copyTemplates', function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('clean', function () {
    return del([
        'dist/**/*',
        '!dist/index.html'
    ]);
});

gulp.task('default', ['copyFontawesome', 'copySystemJs', 'copyAssets', 'copyTemplates']);