/** configuration des taches GULP */

/** pour choper la librairie GULP dans node_modules */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');
const cleancss = require('gulp-clean-css');

/** creation de task */
gulp.task('hello', function( callback ) {
    console.log('Hello from GULP !');
    callback();
});

// on cree une tache, on execute un traitement
/// $ > ./node_modules/.bin/gulp hello

gulp.task('sass', function( ){
    // un ou plusieurs fichiers sources
    // une serie de pipes
    // une destination
    return gulp.src('./assets/scss/styles.scss')
        .pipe( sass() )
        .pipe( postcss ([
            flexbugs,
            autoprefixer({
                grid : 'autoreplace',
                browsers: ['last 10 versions', 'ie >= 10', 'ios > 7']
            })
        ]))
        .pipe(cleancss())
        .pipe( gulp.dest( './assets/css/') );

});

gulp.task('watch', function(  ){
    browserSync.init({
        server : {
            baseDir : './'
        }
    });

    gulp.watch( ['./assets/scss/**/*.scss'], gulp.series('sass') ).on('change', browserSync.reload); //on lance la tache sass definie + haut
    gulp.watch( ['./*.html'] ).on('change', browserSync.reload);
});