var gulp       = require('gulp');
var browserify = require('browserify');
var connect    = require('gulp-connect');
var partialify = require('partialify');
var uglifyify  = require('uglifyify');
var source     = require('vinyl-source-stream');
var glob       = require('glob');
var karma      = require('karma').server;
var compass    = require('gulp-compass');

gulp.task('build', function(){
  var files = glob.sync('./src/**/*.js');
  browserify(files)
  .transform(partialify)
  .transform(uglifyify)
  .bundle()
  .pipe(source('all.js'))
  .pipe(gulp.dest('public'));
});

gulp.task('compass', function(){
  gulp.src('./src/styles/all.scss')
      .pipe(compass({
        style: 'compressed',
        css: './public',
        sass: './src/styles'
      }));
});

gulp.task('server', ['build'], function(){
  connect.server({
    root: 'public',
    port: 3001,
    livereload: true
  });
});

gulp.task('watch', ['server', 'test'], function(){
  gulp.watch(['./src/**/*.js'], ['build']);
  gulp.watch(['./src/styles/**/*.scss'], ['compass']);
});

var karmaTask = function(singleRun) {
  karma.start({
    browsers: ['PhantomJS', 'Chrome', 'Safari'],
    frameworks: ['mocha', 'browserify'],
    browserify: {
      files: ['./src/**/*.js', './test/**/*.js'],
      transform: ['partialify', 'espowerify']
    },
    preprocessors: {
      "/**/*.browserify": "browserify"
    },
    reporters: 'dots',
    autoWatch: true,
    singleRun: singleRun
  });
};

gulp.task('test', function(){
  karmaTask(false);
});

gulp.task('testSingle', function(){
  karmaTask(true);
});
