var gulp = require('gulp');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');

gulp.task('templates', function() {
  gulp.src('source/templates/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
      processName: function(filePath) {
        return declare.processNameByPath(filePath.replace('source/templates/', ''));
      }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js/'));
});

// Default task
gulp.task('default', ['templates']);
