const { src, dest, watch, series, parallel } = require("gulp");

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var replace = require("gulp-replace");

const files = {
  scssPath: "app/scss/**/*.scss",
  jsPath: "app/js/**/*.js",
};

function styles() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"));
}

function scripts() {
  return src([files.jsPath])
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(dest("dist"));
}

function cache() {
  var cacheString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cacheString))
    .pipe(dest("."));
}

function tasks() {
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true },
    series(parallel(styles, scripts), cache)
  );
}

exports.default = series(parallel(styles, scripts), cache, tasks);
