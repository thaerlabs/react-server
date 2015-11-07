import gulp from 'gulp';
import nodemon from 'nodemon';
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackConfig from './webpack.config.js';

gulp.task('webpack',['nodemon'], function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack:dev',['nodemon'], function(callback) {

	var webpackDevConfig = Object.create(webpackConfig);
	webpackDevConfig.devtool = 'sourcemap';
	webpackDevConfig.debug = true;

    // run webpack
    webpack(webpackDevConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('nodemon', (cb) => {
	var started = false;
	
	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});


gulp.task('default', ['webpack']);

