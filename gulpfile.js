import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
browserSync.create();

const sass = gulpSass(dartSass);

function compilaSass() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass(/*{outputStyle:'compressed'}*/))
    .pipe(
      autoPrefixer({
        overrideBrowserslist: [
          "last 2 versions",
          "safari 5",
          "ie 8",
          "ie 9",
          "Firefox 14",
          "opera 12.1",
          "ios 6",
          "android 4",
        ],
        cascade: true,
      })
    )
    .pipe(gulp.dest("css/"));
}

gulp.task("compilaSass", compilaSass);

function browser() {
   browserSync.init({
    server: {
        baseDir: './'
    }
   })
}
gulp.task('browser', browser)

function watch() {
  gulp.watch("scss/*.scss", compilaSass);
  // gulp.watch('*.html').on('change')
}

gulp.task("watch", watch);

gulp.task("default", gulp.parallel("watch", "compilaSass", 'browser'));
