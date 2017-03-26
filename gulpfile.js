/*
gulpfile.js

gulpfile for app web app.
*/

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const liveload = require('gulp-livereload');
const sass = require('gulp-sass');
let jsdoc = require('gulp-jsdoc3');

gulp.task('sass', function() {
    gulp.src('./src/public/assets/styles/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/public/assets/styles/'))
        .pipe(liveload());
});

gulp.task('js', function() {
    gulp.src('./src/public/js/client.js')
        .pipe(gulp.dest('./src/public/js/dist'))
        .pipe(liveload());
});

gulp.task('watch', function() {
    gulp.watch('./src/public/**/*.scss', ['sass']);
    gulp.watch('./src/public/**/*.js', ['js']);
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('**/src/**/*.js', ['jsdoc']);
});

gulp.task('develop', function() {
    liveload.listen();
    nodemon({
        script: 'src/server/server.js',
        ext: 'js handlebars hbs',
        stdout: false,
    }).on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if (/^Express started on/.test(chunk)) {
                liveload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('jsdoc', function(cb) {
    let config = require('./jsdoc.json');
    gulp.src(['./README.md', './src/public/assets/**/*.js', './src/server/**/*.js'], {
            read: false,
        })
        .pipe(jsdoc(config, cb));
});

// gulp.task('default', ['sass', 'js', 'jsdoc', 'develop', 'watch']);
gulp.task('default', ['sass', 'js', 'jsdoc', 'watch']);
