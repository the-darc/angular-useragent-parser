var gulp = require('gulp'),
	path = require('path'),
	plugins = require('gulp-load-plugins')({
		config: path.join(__dirname, 'package.json')
	});

gulp.task('build', function() {
	var pkg = require('./bower.json');

	var header = ['/**',
		' * <%= pkg.name %>',
		' * <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @author <%= pkg.authors[0]%>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		'(function (angular, _window) {',
		'	this.navigator = _window.navigator;',
		'',
		''].join('\n');

	var footer = [
		'',
		'}).apply({}, [angular, window]);',
		''].join('\n');

	gulp.src([
		'bower_components/ua-parser-js/src/ua-parser.js',
		'src/angular-useragent-parser.js'
	])
	.pipe(plugins.concat('angular-useragent-parser.js'))
	.pipe(plugins.header(header, {pkg: pkg}))
	.pipe(plugins.footer(footer))
	.pipe(gulp.dest('./release/'))
	.pipe(plugins.uglify())
	.pipe(plugins.concat('angular-useragent-parser.min.js'))
	.pipe(gulp.dest('./release/'));
});
