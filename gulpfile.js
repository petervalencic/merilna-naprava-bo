"use strict";

/**
 * Author Peter Valencic
 * Usage gulp build
 */
const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const tap = require('gulp-tap');
const {exec} = require('child_process');
const packageJson = require('./package.json');

// Define where the files will be placed
const PROJECT_ROOT = ".";
const DIST_DIR = `${PROJECT_ROOT}/dist`;
const DELIVERY_DIR = `${PROJECT_ROOT}/deliverable`;
// define the output filename
const OUTPUT_FILE_NAME = 'merilna-naprava.zip';


// Delete the dist directory and everything under it
const cleanDist = () => {
    return del(DIST_DIR);
};

// Delete the delivery directory and everything under it
const cleanDelivery = () => {
    return del(DELIVERY_DIR);
};

/*
const copyCommon = () => {
    return gulp.src(`../common/*`)
        .pipe(gulp.dest(`./common`));
};
*/

// Copy all files that will be located in the base directory
// Notice we skip any that need compiling.
const copyBaseFiles = () => {
    return gulp.src(
        [
            `${PROJECT_ROOT}/package.json`,
            `${PROJECT_ROOT}/index.js`,
            `${PROJECT_ROOT}/.env`,
            `${PROJECT_ROOT}/Dockerfile`
        ]
    )
        .pipe(gulp.dest(DIST_DIR));
};


// Copy the lib fils to project root
const copyLib = () => {
    return gulp.src(`${PROJECT_ROOT}/lib/*`)
        .pipe(gulp.dest(`${DIST_DIR}/lib`));
};


// Copy the features files to project root
const copyFeatures = () => {
    return gulp.src(`${PROJECT_ROOT}/features/**`)
        .pipe(gulp.dest(`${DIST_DIR}/features`));
};

const done = (cb) => {
    console.log('Done!');
    cb();
};


// Zip the dist directory
// We use a tab to determine if the file should be a directory, executable, config or regular
// file and set the mode explicitly in the zip file.
// This allows Windows builds to work correctly when unzipping to Linux.
const zipIt = () => {
    let dirMode = parseInt('40755', 8);
    let fileMode = parseInt('100644', 8);

    return gulp.src(`${DIST_DIR}/**/*`)
        .pipe(tap((file) => {

            if (file.stat.isDirectory()) {
                file.stat.mode = dirMode;
            } else {
                file.stat.mode = fileMode;
            }

        }))
        .pipe(zip(OUTPUT_FILE_NAME))
        .pipe(gulp.dest(`${DELIVERY_DIR}`));
};

const build = gulp.series(
    cleanDist,
    cleanDelivery,
    copyLib,
    copyFeatures,
    copyBaseFiles,
    done
);

gulp.task('build', build);
gulp.task('default', build);
gulp.task('clean', gulp.series('cleanDist'));