"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const svgstore = require("gulp-svgstore");
const run = require("run-sequence");
const minify = require('gulp-minify');
const cheerio = require("gulp-cheerio");

gulp.task("style", () => {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/**/*.js", ["js"]);
});

gulp.task("images", () => {
  return gulp.src("img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

gulp.task("webp", () => {
  return gulp.src("img/**/{triple*.jpg,photo*.jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("img"));
});


// gulp.task("cleanWebp", (done) => {
//   return del("img/**/*.webp");
// });



gulp.task("html", () => {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("js", () => {
  return gulp.src("js/**/*.js")
    .pipe(minify({
        ignoreFiles: ["picturefill.min.js"]
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("sprite", () => {
  return gulp.src("img/**/{icon-*.svg,logo-*svg}")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", () => {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", () => {
  return del("build");
});


gulp.task("build", (done) => {
  run(
    "clean",
    "copy",
    "style",
    "sprite",
    "html",
    "js",
    done
  );
});
