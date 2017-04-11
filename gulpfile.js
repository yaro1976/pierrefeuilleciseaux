/*
gulpfile.js

gulpfile for app web app.
*/

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const liveload = require('gulp-livereload');
const sass = require('gulp-sass');
var jsdoc = require('gulp-jsdoc3');

gulp.task('sass', function () {
    console.log('Compilation des fichiers SASS');
    gulp.src('./src/public/assets/styles/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/public/assets/styles/'))
        .pipe(liveload());
});

gulp.task('js', function () {
    console.log('Traitement des fichiers Javascript');
    gulp.src('./src/public/js/client.js')
        .pipe(gulp.dest('./src/public/js/dist'))
        .pipe(liveload());
});

gulp.task('watch', function () {
    gulp.watch('./src/public/**/*.scss', ['sass']);
});
gulp.task('watch', function () {
    gulp.watch('./src/public/**/*.js', ['js']);
});
gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['js']);
});
gulp.task('watch', function () {
    gulp.watch('**/src/**/*.js', ['jsdoc']);
});

gulp.task('develop', function () {
    console.log('Lancement du serveur Web');
    liveload.listen({
        basePath: __dirname + "/src/"
    });
    nodemon({
        script: 'src/server/server.js',
        ext: 'js html css',
        verbose: true,
        debugPort: 5858,
        nodeArgs: ['--debug'],
        watch: 'src/**/*',
        env: {
            'NODE_ENV': 'development'           
        },
        stdout: true,
    }).on('readable', function () {
        this.stdout.on('data', function (chunk) {
            if (/^Express started on/.test(chunk)) {
                liveload.changed(__dirname + "/src/");
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('jsdoc', function (cb) {
    console.log('Génération de la documentation');
    var config = require('./jsdoc.json');
    gulp.src(['./README.md', './src/public/assets/js/**/*.js', './src/server/**/*.js'], {
            read: true,
        })
        .pipe(jsdoc(config, cb));
});

gulp.task('default', ['sass', 'js', 'jsdoc', 'develop', 'watch']);
// gulp.task('default', ['sass', 'js', 'jsdoc', 'watch']);