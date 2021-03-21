const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

//setting : paths
const paths = {
    root: './dest/',
    ejs: {
        src: ['./src/ejs/**/*.ejs', '!' + './src/ejs/**/_*.ejs'],
        watch: './src/ejs/**/*.ejs',
        dist: './dest/'
    },
    styles: {
        src: './src/sass/**/*.scss',
        dist: './dest/css/'
    },
    scripts: {
        src: './src/js/**/*.js',
        dist: "./dest/js/"
    }
};

//gulpコマンドの省略
const { watch, task, src, dest, parallel } = require('gulp');

//ejs
task('ejs', function () {
    return (
        src(paths.ejs.src)
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: 'ejsエラーだよ',
                    message: '<%= error.message %>'
                })
            }))
            .pipe(ejs({}, {}, { ext: '.html' }))
            .pipe(rename({
                extname: '.html'
            }))
            .pipe(dest(paths.ejs.dist))
    );
});

//Sass
task('sass', function () {
    return (
        src(paths.styles.src)
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: 'Sassエラーだよ',
                    message: '<%= error.message %>'
                })
            }))
            .pipe(sassGlob())
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(autoprefixer({
                browsers: ['ie >= 11'],
                cascade: false,
                grid: true
            }))
            .pipe(dest(paths.styles.dist))
    );
});

//JS Compress
task('js', function () {
    return (
        src(paths.scripts.src)
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: 'jsエラーだよ',
                    message: '<%= error.message %>'
                })
            }))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(dest(paths.scripts.dist))
    );
});

// browser-sync
task('browser-sync', () => {
    return browserSync.init({
        server: {
            baseDir: paths.root,
            index: 'index.html'
        },
        port: 8080,
        reloadOnRestart: true
    });
});

// browser-sync reload
task('reload', (done) => {
    browserSync.reload();
    done();
});

//watch
task('watch', (done) => {
    watch(paths.ejs.watch, gulp.task('ejs'));
    watch(paths.styles.src, gulp.task('sass'));
    watch(paths.scripts.src, gulp.task('js'));
    done();
});
task('default', parallel('watch', 'browser-sync'));