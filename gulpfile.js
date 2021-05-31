const { src, dest, watch, series, parallel } = require("gulp");

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var replace = require("gulp-replace");

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
    .pipe(dest("dist"));
}

function scripts() {
  return src([files.jsPath])
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(dest("dist"));
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
