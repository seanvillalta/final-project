// ////////////////////////////////////////////////
// Required
// ////////////////////////////////////////////////

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename');

// ////////////////////////////////////////////////
// Scripts Task
// ////////////////////////////////////////////////
gulp.task('scripts', function() {
    gulp.src(['node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

// ////////////////////////////////////////////////
// Image Optimization Tasks
// ////////////////////////////////////////////////
gulp.task('image', function() {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images-min'));
});

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    // gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// ////////////////////////////////////////////////
// Sass Tasks
// ////////////////////////////////////////////////
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(sourcemaps.write())
        .pipe(browserSync.stream());
});

// ////////////////////////////////////////////////
// CSS-MIN Tasks
// ////////////////////////////////////////////////
gulp.task('css-min', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("css"));
});

// ////////////////////////////////////////////////
// Default Task
// ////////////////////////////////////////////////
gulp.task('default', ['serve', 'image', 'scripts', 'css-min']);
