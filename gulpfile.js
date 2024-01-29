const gulp =  require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

// css minification
gulp.task('css',(done)=>{
    // ./assets/css will also have #  for development mode
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))  
    
     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) // for production mode we change assets folder in public
    .pipe(rev.manifest({
        cwd:'public',
        merge: true

    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// js minification
gulp.task('js',(done)=>{
    // ./assets/css will also have #  for development mode
    console.log('minifying js...');
    
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) // for production mode we change assets folder in public
    .pipe(rev.manifest({
        cwd:'public',
        merge: true

    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// image minification
gulp.task('images',(done)=>{
    // ./assets/css will also have #  for development mode
    console.log('minifying js...');
    
     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) // for production mode we change assets folder in public
    .pipe(rev.manifest({
        cwd:'public',
        merge: true

    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// empty the public/assets directory
gulp.task('clean:assets',(done)=>{
    console.log("deletd prevoius assets");
    del.sync('./public/assets');
    done();
});

// to run all task
gulp.task('build',gulp.series('clean:assets', 'css', 'js', 'images'),(done)=>{
    console.log("building assets");
    done();
})
