const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require ('gulp-uglify');
const obfuscate = require ('gulp-obfuscate');
const imagemin = require ('gulp-imagemin');

function comprimeImagens(){
    //buscando na pasta images com qualquer extensão
    return gulp.src('./source/images/*')
    //função gulp de comprimir imagens
    .pipe(imagemin())
    //loca de destino das imagens comprimidas
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript(){
    //A função terá um retorno buscando arquivos na pasta abaixo
    return gulp.src('./source/scripts/*.js')
    //função do pacote de compressão uglify
    .pipe(uglify())
    //função do pacote de obfuscação - troca de caracteres
    .pipe(obfuscate())
    //local onde os arquivos comprimidos serão colocados
    .pipe(gulp.dest('./build/scripts'))
}

function complilaSass(){
    return gulp.src("./source/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function(){
    //abaixo os locais obersavdos, e havendo mudança, a função a ser executada.
    gulp.watch('./source/scripts/*.js',{ignoreInitial: false}, gulp.series(comprimeJavaScript))
    gulp.watch('./source/images/*',{ignoreInitial: false}, gulp.series(comprimeImagens))
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false}, gulp.series(complilaSass))
}
