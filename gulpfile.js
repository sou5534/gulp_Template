var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var rename = require('gulp-rename');
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task("html", function() {
    gulp.src("**/*.html")
        .pipe(plumber())
        .pipe(browser.reload({ stream: true }));
});
gulp.task("sass", function() {
    gulp.src("sass/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({ stream: true }));
});
gulp.task("sass_watch", function() {
    gulp.watch("sass/**/*.scss", ["sass"]);
});
gulp.task("js", function() {
    gulp.src(["js/**/*.js", "!js/min/**/*.min.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({ stream: true }));
});
gulp.task("img", function() {
    gulp.src("img/*(*.jpg|*.png|*.gif)")
        .pipe(imagemin())
        .pipe(gulp.dest("./img/min"));
});
gulp.task("default", ['server'], function() {
    gulp.watch(["js/**/*.js", "!js/min/**/*.js"], ["js"]);
    gulp.watch("sass/**/*.scss", ["sass"]);
    gulp.watch("img/*(*.jpg|*.png|*.gif)", ["img"]);
    gulp.watch("**/*.html", ["html"]);
});
