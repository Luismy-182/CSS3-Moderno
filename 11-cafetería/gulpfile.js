import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
//tools for images
// Herramientas para imágenes
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';


import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
const sass = gulpSass(dartSass); //

//compilar css
export const css = (done) => {
    src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));
    done();
};

//imagenes ligeras con gulp

const imagenes= (done)=>{
    const opciones={
        optimizationLevel:3
    }
    src('src/img/**/*')
    .pipe(imagemin({opciones}))
    .pipe(dest('build/img'));
    done();
}

const versionWebp=()=>{
    return src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('build/img'))
}

const versionAvif=(done)=>{
    const opciones={
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}




//ahora esucha por imagenes y por scss
const dev = () => {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}
export default series(imagenes, versionWebp, versionAvif, css, dev);