var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var bourbon = require("node-bourbon").includePaths;
var neat = require("node-neat").includePaths;
var reload = browserSync.reload;

var src = {
   scss: 'src/scss/*.scss',
   css:  'src/css',
   html: 'src/*.html'
};

// Sass convert

gulp.task("sass", function() {
	gulp.src(src.scss)
			.pipe(sass({
				includePaths: bourbon,
				includePaths: neat
			}))
			.pipe(gulp.dest(src.css))
			.pipe(browserSync.reload({
				stream: true
			}))
});

// Browsersync server

gulp.task('serve', ['sass'], function() {
 browserSync({
   server: {
     baseDir: 'src'
   }
 });

//Watch

 gulp.watch(src.scss, ['sass']);
   gulp.watch(src.html).on('change', browserSync.reload);
});

