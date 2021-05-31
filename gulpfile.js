const { src, dest, watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var replace = require("gulp-replace");
var notify = require("gulp-notify");

var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

const files = {
  scssPath: "app/scss/**/*.scss",
  jsPath: "app/js/**/*.js",
};

function styles() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(notify("Styles completed!"));
}

function scripts() {
  return src([files.jsPath])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(dest("dist"))
    .pipe(notify("Scripts completed!"));
}

function cache() {
  var cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

function tasks() {
  watch(
    [files.scssPath, files.jsPath],

    series(parallel(styles, scripts), cache)
  ).on("change", reload);

  browserSync.init(["./**/**.**"], {
    port: 3000,
    server: {
      baseDir: "./",
    },
  });
}

exports.default = series(parallel(styles, scripts), cache, tasks);
