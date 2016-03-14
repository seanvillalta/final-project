// ////////////////////////////////////////////////
// Required
// ////////////////////////////////////////////////

var gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    cleanCSS    = require('gulp-clean-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    imagemin    = require('gulp-imagemin'),
    size        = require('gulp-size');
    rename      = require('gulp-rename');

// ////////////////////////////////////////////////
// Scripts Task
// ////////////////////////////////////////////////
gulp.task('scripts', function(){
    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({stream:true}));
});

// ////////////////////////////////////////////////
// Styles Tasks
// ////////////////////////////////////////////////
gulp.task('compass', function(){
    gulp.src('scss/*.scss')
        .pipe(compass({
            sourcemap: true,
            debug : true,
            style: 'compressed',
            css: 'css',
            sass: 'scss'
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

// ////////////////////////////////////////////////
// Image Optimization and Gulp-Size Tasks
// ////////////////////////////////////////////////
gulp.task('image', function(){
    gulp.src('images/*')
    .pipe(imagemin())
    .pipe(size())
    .pipe(gulp.dest('images-min'));
});

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////
gulp.task('serve', function(){
    browserSync({
        server:{
            baseDir: "./"
        }
    });
    // gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['compass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

// ////////////////////////////////////////////////
// Default Task
// ////////////////////////////////////////////////
gulp.task('default', ['scripts', 'compass', 'image', 'serve']);
