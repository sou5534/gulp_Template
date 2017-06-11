var rename = require('gulp-rename');
gulp.task("server", function() {
    browser({
        // notify: false
        server: {
            baseDir: "./"
        }
    });
});