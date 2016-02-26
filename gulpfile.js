  'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var injector = require('bs-html-injector');
var jade = require('gulp-jade');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var reload = browserSync.reload;

var src = {
  src: 'src',
  css: 'src/css',
  scss: 'src/scss/**/*.scss',
  html: 'src/*.html',
  jade: 'src/*.jade'
};

// Jade convert

gulp.task('jade', function () {
  gulp.src(src.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(src.src))
});

// Sass convert

gulp.task('sass', function () {
  gulp.src(src.scss)
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat
    }).on('error', sass.logError))
    .pipe(gulp.dest(src.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Browsersync server

gulp.task('server', ['sass'], function () {
  browserSync.use(injector, {
        files: 'src/*.html'
    });
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false,
    tunnel: true,
    tunnel: 'turumtumtum'
  });
});

//Watch

gulp.task('watch', function () {
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.jade, ['jade']);
});

// Default Task

gulp.task('default', ['server', 'watch']);
