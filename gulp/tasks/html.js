import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import gulp_pug from "gulp-pug";
import htmlmin from "gulp-htmlmin";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>",
            })
        ))
        .pipe(fileinclude())
        .pipe(webpHtmlNosvg())
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                htmlmin({ collapseWhitespace: true })
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}


export const pug = () => {
    return app.gulp.src(app.path.src.pug)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "PUG",
                message: "Error: <%= error.message %>",
            })
        ))
        .pipe(
            app.plugins.ifPlugin(
                !app.isBuild,
                gulp_pug({
                    // Сжатие HTML файла
                    pretty: true,
                })
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                gulp_pug({
                    // Сжатие HTML файла
                    pretty: false,
                })
            )
        )
        .pipe(webpHtmlNosvg())
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}

