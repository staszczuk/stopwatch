var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var ts = require('gulp-typescript');

gulp.task("reload", function(done) {
    browserSync.reload();
    done();
});

gulp.task("html", function(done) {
    gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
    done();
});

gulp.task("css", function(done) {
    gulp.src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"));
    done();
});

gulp.task("js", function(done) {
    gulp.src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
    done();
});

gulp.task("default", gulp.parallel("html", "css", "js"));

gulp.task("server", function() {
    browserSync({
        server: "dist"
    });
    gulp.watch("src/*.html", gulp.series("html", "reload"));
    gulp.watch("src/**/*.scss", gulp.series("css", "reload"));
    gulp.watch("src/**/*.js", gulp.series("js", "reload"));
});
