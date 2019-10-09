const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .copyDirectory('resources/js/front', 'public/js/front')
    .copyDirectory('resources/css/front', 'public/css/front')
    .styles([
        'public/css/front/bootstrap.min.css',
        'public/css/front/font-awesome.min.css',
        'public/css/front/flaticon.css',
        'public/css/front/slicknav.min.css',
        'public/css/front/jquery-ui.min.css',
        'public/css/front/owl.carousel.min.css',
        'public/css/front/animate.css',
        'public/css/front/style.css',
    ],  'public/css/all.css')
    .scripts([
        'public/js/front/jquery-3.2.1.min.js',
        'public/js/front/boostrap.min.js',
        'public/js/front/jquery.slicknav.min.js',
        'public/js/front/owl.carousel.min.js',
        'public/js/front/jquery.nicescroll.min.js',
        'public/js/front/jquery.zoom.min.js',
        'public/js/front/jquery-ui.min.js',
        'public/js/front/main.js',
    ],  'public/js/all.js');