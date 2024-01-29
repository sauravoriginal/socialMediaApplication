const gulp =  require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

gulp.task('css',()=>{
    // ./assets/css will also have #  for development mode
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))  
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) // for production mode we change assets folder in public
    .pipe(rev.manifest({
        cwd:'public',
        merge: true

    }))
    .pipe(gulp.dest('./public/assets'));
})