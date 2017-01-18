var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  concat = require( 'gulp-concat' ),
  stylus = require( 'gulp-stylus' ),
  cssmin = require( 'gulp-cssmin' );

// Fazer refresh na página enquanto desenvolve
var browserSync = require("browser-sync").create();

  gulp.task("serve", function(){
    browserSync.init({
      server:{
        baseDir:'./'
      }
    });
    gulp.watch("./index.html").on("change", browserSync.reload);

});


// concatenando os arquivos do angularjs e chart em um único arquivos script.js
gulp.task( 'js', function() {

  gulp.src( [
    'bower_components/angular/angular.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-i18n/angular-locale_pt-br.js',
    'bower_components/chart.js/dist/Chart.js',
    'bower_components/angular-chart.js/dist/angular-chart.js'
  ] )
    .pipe( concat( 'script.js' ) )
    .pipe( gulp.dest( 'assets/js' ) );


  gulp.src( 'app/**/*js' )
    .pipe( concat( 'application.js' ) )
    .pipe( gulp.dest( 'assets/js/' ));

});

// construindo os arquivos de CSS
gulp.task( 'css', function() {

  gulp.src( 'assets/stylus/app.styl' )
    .pipe( stylus( {compress: true} ) )
    .pipe( concat( 'application.css' ) )
    .pipe( gulp.dest( 'assets/css/' ) );

  gulp.src( 'bower_components/weather-icons/css/weather-icons.min.css' )
      .pipe( concat( 'icons.css' ) )
      .pipe( gulp.dest( 'assets/css' ) );

  gulp.src( 'bower_components/weather-icons/font/**/*' )
      .pipe( gulp.dest( 'assets/font' ) );

});


// Otimizar imagens para melhor carregamento da app.
gulp.task('build-image', function() {

  gulp.src('assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images'));
});

// Watch
gulp.task('watch', function() {

  gulp.watch( 'app/**/*js', ['js'] );
  gulp.watch( 'assets/stylus/**/*.styl', ['css'] );

});

// build for development
gulp.task( 'default', ['serve', 'js', 'css', 'watch'] );
