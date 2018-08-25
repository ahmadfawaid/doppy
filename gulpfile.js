var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
	  reload = browserSync.reload,
	  babel = require('gulp-babel'),
	  concat = require('gulp-concat'),
	  plumber = require('gulp-plumber'),
	  notify = require('gulp-notify'),
	  cleanCSS = require('gulp-clean-css'),
	  jshint = require('gulp-jshint'),
		stylish = require('jshint-stylish'),
		uglify = require('gulp-uglify'),
	  rename = require('gulp-rename'),
	  sourcemaps = require('gulp-sourcemaps'),
	  imagemin = require('gulp-imagemin'),
	  zip = require('gulp-zip'),
    runSequence = require('run-sequence');	

// Configurations
var config = {
	projectName	: 'doppy',
	version		: '1.0.0',
	srcDir		: './src',
	destDir		: './dist'
}

// Compile SASS files
gulp.task('style', function(){
	return gulp.src(config.srcDir + '/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			// outputStyle: 'expanded'
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(rename('style.css'))
		.on('error', notify.onError({
			title 	: 'SASS Error',
			message : 'Please check SASS file',
		})).on('error', function(){this.emit('end')})
		.pipe(autoprefixer({browsers: "last 3 version"}))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.destDir + '/assets/css/'));
});

	// Compile Script Files
gulp.task('script', function(){
	return gulp.src(config.srcDir + '/js/main.js')
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		// .pipe(babel({"presets": ["es2015"]}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.destDir + '/assets/js/'));
});

// Concat Script Plugins
gulp.task('script-plugins', function(){
	return gulp.src(config.srcDir + '/js/plugins/**/*.js')
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest(config.destDir + '/assets/js'));
});

// Optimize Image
gulp.task('images', function(){
	return gulp.src(config.srcDir + '/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(config.destDir + '/assets/images'));
});

// Serve
gulp.task('serve', function(){
	browserSync.init({
		server: config.destDir
	});
	gulp.watch(config.srcDir + '/**/*', ['style'], ['script'], ['script-plugins']).on('change', reload);
	// gulp.watch(config.srcDir + '/**/*.scss', ['style']).on('change', reload);
	// gulp.watch(config.srcDir + '/**/*.js', ['script']).on('change', reload);
	gulp.watch(config.destDir + '/*.html').on('change', reload);
});

// Build ZIP
gulp.task('build-zip', function(){
	return gulp.src(config.destDir + '/**')
		.pipe(zip(`${config.projectName}-${config.version}.zip`))
		.pipe(gulp.dest('./'))
		.pipe(notify({
			title	: config.projectName,
			message : `Bundling Project Completed. Output file: ${config.projectName}-${config.version}.zip`,
			onLast	: true
		}))
});

// Bundle
gulp.task('bundle', function(done){
	runSequence('style', 'script', 'script-plugins', 'images', 'build-zip', done);
});


