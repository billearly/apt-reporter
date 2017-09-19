var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

// --- linting ---
gulp.task('lint', () => {
    return gulp.src('lib/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', gutil.log);
});

// --- testing ---
gulp.task('test', ['lint'], (done) => {
    return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({
        reporter: 'spec',
        require: 'babel-register'
    }))
    .on('error', gutil.log);
    
    done(err);
});

gulp.task('test:no-deps', () => {
    return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({
        reporter: 'spec',
        require: 'babel-register'
    }))
    .on('error', gutil.log);
});

// --- building ---
gulp.task('build', ['test'], () => {
    gulp.src('lib/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build:no-deps', () => {
    gulp.src('lib/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('build'));
});

// --- watching ---
gulp.task('watch', () => {
    gulp.watch(['lib/**', 'test/**'], ['build']);
});

gulp.task('watch:lint', () => {
    gulp.watch(['lib/**'], ['lint']);
});

gulp.task('default', ['build']);