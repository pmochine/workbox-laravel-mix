const mix = require('laravel-mix');

const { InjectManifest } = require('workbox-webpack-plugin');

const configPlugins = {
    plugins: [
        new InjectManifest({
            swSrc: './resources/js/sw.js',
            swDest: 'service-worker.js',
            // precaching only these.
            chunks: [
                '/js/app', '/js/vendor', '/js/manifest',
            ],
            maximumFileSizeToCacheInBytes: 5000000,
        }),
    ],
    output: {
        publicPath: '',
        chunkFilename: 'js/[name].[chunkhash].js',
    },
};

//To see chunk names
mix.after((stats) => {
    const { assets } = stats.toJson({ assets: true });

    console.log('\n');
    console.table(assets.map((asset) => ({
        name: asset.name,
        chunks: asset.chunkNames.join(', '),
    })));
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ])
    .webpackConfig(configPlugins)
    .extract();
